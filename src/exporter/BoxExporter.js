import {Points} from "../Points.js";


export class BoxExporter {
  /*let debugGeometry = new THREE.SphereGeometry(0.01, 4, 4);
  let debugMaterial = new THREE.MeshLambertMaterial({
    color: '#8e44ad',
    transparent: true,
    opacity: 0.5
  }); */

  constructor(box, pointCloud) {
    const basePoint = box.position.clone();

    this.box = new THREE.Box3();
    this.box.expandByPoint(basePoint.clone().add(
        new THREE.Vector3(
          (box.scale.x / 2) * -1,
          (box.scale.y / 2) * -1,
          (box.scale.z / 2) * -1,
        )
      )
    );

    this.box.expandByPoint(basePoint.clone().add(
        new THREE.Vector3(
          (box.scale.x / 2),
          (box.scale.y / 2),
          (box.scale.z / 2),
        )
      )
    );
    // this.box.applyMatrix4(box.matrixWorld);
    console.log('this.box', this.box);
    this.pointCloud = pointCloud;
  }

  debugPoint(x, y, z) {
    //console.log('point', {x, y ,z});
    const sphere = new THREE.Mesh(this.debugGeometry, this.debugMaterial);
    // object position
    sphere.position.set(x, y, z);
    window.viewer.scene.scene.add(sphere);
  }

  debugPoints(points) {
    for (let i = 0; i < points.numPoints; i++) {
      this.debugPoint(points.data.position[i * 3], points.data.position[i * 3 + 1], points.data.position[i * 3 + 2]);
    }
  }

  getPoints(){
    const target = new Points();
    const generator = this.getIntersectingChildren(this.pointCloud.pcoGeometry.nodes.r);
    let iterator = generator.next();

    while (!iterator.done) {
      if (!iterator.done) {
        try {
          target.add(this.getChildPoints(iterator.value));
        } catch (e) {
          console.error('error getChildPoints', e);
        }
      }
      iterator = generator.next();
    }
    console.log('target', target);
    //this.debugPoints(target);
    return target;
  }

  filterPoints(node, points) {
    const matrix = new THREE.Matrix4().multiplyMatrices(
        this.pointCloud.matrixWorld,
      new THREE.Matrix4().makeTranslation(...node.boundingBox.min.toArray())
    );
    let accepted = new Uint32Array(node.numPoints);
    let acceptedPositions = new Float32Array(node.numPoints * 3);
    let numAccepted = 0;

    let pos = new THREE.Vector3();

    let view = new Float32Array(node.geometry.attributes.position.array);
    for (let i = 0; i < node.numPoints; i++) {
      pos.set(
        view[i * 3],
        view[i * 3 + 1],
        view[i * 3 + 2]);

      pos.applyMatrix4(matrix);

      if (this.box.containsPoint(pos)) {
        accepted[numAccepted] = i;
        points.boundingBox.expandByPoint(pos);

        acceptedPositions[3 * numAccepted] = pos.x;
        acceptedPositions[3 * numAccepted + 1] = pos.y;
        acceptedPositions[3 * numAccepted + 2] = pos.z;
        //this.debugPoint(pos.x, pos.y, pos.z);
        numAccepted++;
      }
    }
    return {
      accepted: accepted.subarray(0, numAccepted),
      acceptedPositions: acceptedPositions.subarray(0, numAccepted * 3)
    };
  }

  getChildPoints(child) {
    const points = new Points();
    const filteredPoints = this.filterPoints(child, points);
    const relevantAttributes = Object.keys(child.geometry.attributes).filter(a => !["position", "indices"].includes(a));

    points.data.position = filteredPoints.acceptedPositions;

    for (let attributeName of relevantAttributes) {

      let attribute = child.geometry.attributes[attributeName];
      let numElements = attribute.array.length / child.numPoints;
      let Type = attribute.array.constructor;

      let filteredBuffer = new Type(numElements * filteredPoints.accepted.length);

      let source = attribute.array;
      let target = filteredBuffer;

      for (let i = 0; i < filteredPoints.accepted.length; i++) {

        let index = filteredPoints.accepted[i];

        let start = index * numElements;
        let end = start + numElements;
        let sub = source.subarray(start, end);

        target.set(sub, i * numElements);
      }

      points.data[attributeName] = filteredBuffer;
    }

    points.numPoints = filteredPoints.accepted.length;
    return points;
  }

  * getIntersectingChildren(child) {
    if (this.nodeIntersectsBox(child, this.box) && child.hasChildren) {
      yield child;

      for (let subChild of Object.values(child.children)) { 
        yield* this.getIntersectingChildren(subChild);
      }
    }   
  }

  nodeIntersectsBox(child, box) {
    return child.boundingBox.clone().applyMatrix4(this.pointCloud.matrixWorld).intersectsBox(box);
  }
}
