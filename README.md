

# About

* This is a multi-pointcloud viewer based on Potree, which is a free open-source WebGL based point cloud renderer for large point clouds. It is based on the [TU Wien Scanopy project](https://www.cg.tuwien.ac.at/research/projects/Scanopy/) and research projects [Harvest4D](https://harvest4d.org/), [GCD Doctoral College](https://gcd.tuwien.ac.at/) and [Superhumans](https://www.cg.tuwien.ac.at/research/projects/Superhumans/).
* Reference: [Potree: Rendering Large Point Clouds in Web Browsers](https://www.cg.tuwien.ac.at/research/publications/2016/SCHUETZ-2016-POT/SCHUETZ-2016-POT-thesis.pdf)

![pic0](https://user-images.githubusercontent.com/51262683/107680799-50a21780-6c6c-11eb-8937-23f6759423d3.PNG)

![pic1](https://user-images.githubusercontent.com/51262683/107680793-4f70ea80-6c6c-11eb-902c-4270b67790c0.PNG)

![pic2](https://user-images.githubusercontent.com/51262683/107680784-4e3fbd80-6c6c-11eb-9b43-fcd4b5ec5254.PNG)


# Getting Started

### Install

Install [node.js](http://nodejs.org/)

Install dependencies, as specified in package.json, and create a build in ./build/potree.

```bash
npm install
```

### Run

Use the `npm start` command to 

* create ./build/potree 
* watch for changes to the source code and automatically create a new build on change
* start a web server at localhost:1234. 

### Some Use Cases

To run the standard Potree single viewer, go to http://localhost:1234/examples/ to test any of the examples.

To run the double pointcloud viewer, go to the test.html example in the examples folder. Then, duplicate and rename the file and modify the pointcloud paths in the html file to your own point cloud. 

To import a shapefile on a pointcloud and extract its feature coordinates or get the intersection of the shapefile and pointcloud in LAS format, go to S02Test.html example in the examples folder. Then, duplicate and rename the file and modify the pointcloud paths in the html file to your own point cloud and also modify the shapefile path mentioned in the Potree.Utils.loadShapefileFeatures function to the path to your own shapefile. Then, run the example file in the browser and get the CSV or LAS by clicking on the respective button at the top of the sidebar.
For LAS, a ZIP file containing LAS files for every feature of the shapefile intersecting the pointcloud will be downloaded. In order to combine these LAS files into the subsequent final LAS file for the entire shapefile, you will need to use LASMerge from [LASTools](https://github.com/LAStools/LAStools). To combine the LAS files using LASMerge, go to the bin directory in LASTools and type this in the console:
```
lasmerge -i "pathToLASFiles/*.las" -o out.las
```
Link to video demonstration of the entire Shapefile extraction workflow: https://youtu.be/lLYaAIE6oK4 . **Note** - Please duplicate the S02Test.html file and then add your own pointcloud and shapefile to it. This video just modifies S02Test.html only for demonstration purposes. S02Test.html is meant to be a template file containing the SHP extraction implementation.

### Convert Point Clouds to Potree Format

Download [PotreeConverter](https://github.com/potree/PotreeConverter) and run it like this:

    ./PotreeConverter.exe C:/pointclouds/data.las -o C:/pointclouds/data_converted

Copy the converted directory into &lt;potreeDirectory&gt;/pointclouds/data_converted. Then, duplicate and rename one of the examples and modify the path in the html file to your own point cloud.

# Downloads

* [Potree](https://github.com/potree/potree/releases)
* [PotreeConverter ](https://github.com/potree/PotreeConverter/releases) - Convert your point cloud to the Potree format.
* [PotreeDesktop ](https://github.com/potree/PotreeDesktop/releases) - Desktop version of Potree. Allows drag&drop of point clouds into the viewer.



# Credits

* The multi-res-octree algorithms used by this viewer were developed at the Vienna University of Technology by Michael Wimmer and Claus Scheiblauer as part of the [Scanopy Project](http://www.cg.tuwien.ac.at/research/projects/Scanopy/).
* [Three.js](https://github.com/mrdoob/three.js), the WebGL 3D rendering library on which potree is built.
* [plas.io](http://plas.io/) point cloud viewer. LAS and LAZ support have been taken from the laslaz.js implementation of plas.io. Thanks to [Uday Verma](https://twitter.com/udaykverma) and [Howard Butler](https://twitter.com/howardbutler) for this!
* [Harvest4D](https://harvest4d.org/) Potree currently runs as Master Thesis under the Harvest4D Project
* Christian Boucheny (EDL developer) and Daniel Girardeau-Montaut ([CloudCompare](http://www.danielgm.net/cc/)). The EDL shader was adapted from the CloudCompare source code!
* [Martin Isenburg](http://rapidlasso.com/), [Georepublic](http://georepublic.de/en/),
[Veesus](http://veesus.com/), [Sigeom Sa](http://www.sigeom.ch/), [SITN](http://www.ne.ch/sitn), [LBI ArchPro](http://archpro.lbg.ac.at/),  [Pix4D](http://pix4d.com/) as well as all the contributers to potree and PotreeConverter and many more for their support.
