<img src="https://user-images.githubusercontent.com/11618221/27022213-469aaaa8-4f4d-11e7-9457-643b86a045e4.png" alt="Semantic OLAP" title="Semantic OLAP" align="middle" height="500"/>


Semantic OLAP
======================

The repository contains the Semantic OALP extension for Semantic MediaWiki. The extension provides a plugin for analyzing SMW Data by using Pivot Tables.

<!--Click [here](https://sandbox.semantic-mediawiki.org/wiki/HaloTestEvent) for a Demo. -->

## Table of content
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
    - [Query Data](#query-data)
    - [Analyze Data](#analyze-data)
    - [Export Data](#export-data)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Links](#links)

## Prerequisites
* [MediaWiki](http://mediawiki.org) must be installed
* [Semantic MediaWiki](https://www.semantic-mediawiki.org/wiki/Semantic_MediaWiki) must be installed


## Installation
* Download and extract the repository
* Place the extracted folder in your extension folder of MediaWiki
* Add the following code at the bottom of your LocalSettings.php:</br>
```wfLoadExtension( 'SemanticOLAP' );```
* To users running MediaWiki 1.24 or earlier: Add the folloding at the bottom of your LocalSettings.php:</br>
```require_once "$IP/extensions/SemanticOLAP/SemanticOLAP.php";```


## Usage
* Go to Special Pages and Click on *Semantic OLAP* under the Group *Semantic MediaWiki*
 

### Query Data
* Before analyzing the data, the data must be queried.
* Semantic OLAP supports the creation of queries by using a Form.
* At least one Category and one Property must be entered. The forms supports the entries by auto-suggestions.
* If no Category or Property is entered, an Error appears. If no Data was retrieved by the Query, then an error appears as well.
* After entering Category and Property, then Click on *Submit*
* *Note: Currently are no multiple values for one property supported.*</br>
<img src="https://user-images.githubusercontent.com/11618221/27022216-469c44e4-4f4d-11e7-88d6-5e8a3fa8b964.png" alt="Query Data" title="Query Data" align="middle" height="300"/>


### Analyze Data
* Use Drag & Drop to put the attributes/properties into column and row. The Pivot Table will build up the data.
* Use Drag & Drop to put the attributes/properties into the Data section.
* Pivot Table allows for filtering and sorting (by clicking on the icon next to the properties/attributes; see image)</br>
<img src="https://user-images.githubusercontent.com/11618221/27022441-3facdd50-4f4e-11e7-93f7-8c38dd1546ff.png" alt="Filter / Sort Data" title="Filter / Sort Data" align="middle" height="100"/></br>
* Properties, marked as Datatype *Quantity*, which has a unit will display the corresponding unit in the Pivot Table.</br>
    <img src="https://user-images.githubusercontent.com/11618221/27022214-469b8a4a-4f4d-11e7-8e17-fc0cf32102af.png" alt="Data in Pivot Table" title="Data in Pivot Table" align="middle" height="500"/></br>
    </br></br><img src="https://user-images.githubusercontent.com/11618221/27022217-46a2024e-4f4d-11e7-80d1-c30bf24cfce9.png" alt="Filter / Sort Data" title="Filter / Sort Data" align="middle" height="300"/>

### Export Data
* Click on the Button *XLS* next to the Button *Export* to export the current view of the Pivot Table in xls.</br>
<img src="https://user-images.githubusercontent.com/11618221/27022218-46b9c834-4f4d-11e7-9d6a-43dc554bcda7.png" alt="Export Data in xls" title="Export Data in xls" align="middle" height="400"/>

## License
Semantic OLAP is currently under the MIT License.


## Acknowledgements
Semantic OLAP uses [orb.js](http://orbjs.net). This is a library for building interactive pivot tables, built with [React.js](http://facebook.github.io/react/).


## Links

* [MediaWiki Extension Page](https://www.mediawiki.org/wiki/Extension:Semantic_OLAP)
* [AIFB](http://www.aifb.kit.edu/web/Semantic_OLAP)
