  var express = require('express');
  var app = express();
  var router = express.Router();
  var fs = require('fs');
  var request = require('request');
  var endpointPortNumber = process.argv.slice(2)[1] || 3030;
  var endpoint = 'http:\//localhost:' + endpointPortNumber.toString() +
    '/dataset/sparql';


  // query to find all the named graphs in SPARQL-endpoint
  var allNamedGraphsQuery = 'SELECT DISTINCT ?g ' +
    'WHERE {' +
    '  GRAPH ?g { ?s ?p ?o }' +
    '}';

  router.get('/', function(req, res) {
    if (!req.session.isAuthenticated && req.app.locals.authRequired)
      res.render('login', {
        title: 'login'
      });
    else {
      var searchedConcept = req.originalUrl,
      namedGraphsString4Qurery = "";

      var searchedConcept = req.originalUrl.substring(req.originalUrl.lastIndexOf('/') + 1);
      var branchName = req.originalUrl.split('/' + searchedConcept)[0].substring(req.originalUrl.split('/' + searchedConcept)[0].lastIndexOf('/') + 1);
      var instaceName = req.originalUrl.split('/' + branchName)[0].substring(req.originalUrl.split('/' + branchName)[0].lastIndexOf('/') + 1);

      // searchedConcept = searchedConcept.substr(1);
      // if (searchedConcept.charAt(0) == '/')
      //   searchedConcept = searchedConcept.split('/')[1];
      // console.log(req.headers);
      // var filePath = 'jsonDataFiles/RDFSConcepts.json'
      // fs.exists(filePath, function(exists) {
      //   if (exists) {
      //     var RDFSdata = require('../jsonDataFiles/RDFSConcepts.json');
      //     var SKOSData = require('../jsonDataFiles/SKOSConcepts.json');
      //     var RDFObjectsPlusURI = require(
      //       '../jsonDataFiles/RDFSObjects.json');
      //     var SKOSObjectsPlusURI = require(
      //       '../jsonDataFiles/SKOSObjects.json');
      //     var OWLIndividuals = require(
      //       '../jsonDataFiles/OWLIndividiuals.json');

      //     var treeData = [];

      //     function SortConcepts(x, y) {
      //       return ((x.concept.toLowerCase() == y.concept.toLowerCase()) ?
      //         0 : ((x.concept.toLowerCase() > y.concept.toLowerCase()) ?
      //           1 : -1));
      //     }


      //     function uniqueConcepts(array) {
      //       var out = [];
      //       var sl = array;
      //       for (var i = 0, l = sl.length; i < l; i++) {
      //         var unique = true;
      //         for (var j = 0, k = out.length; j < k; j++) {
      //           if (sl[i] !== undefined)
      //             if (sl[i].concept.toLowerCase() === out[j].concept.toLowerCase()) {
      //               unique = false;
      //           }
      //         }
      //         if (unique) {
      //           out.push(sl[i]);
      //         }
      //       }
      //       return out;
      //     }


      //     // filter external classes
      //     function filterExternalConcept(RDFObjects) {
      //       var out = [];
      //       var data = [];
      //       for (var i = 0, j = 0, l = RDFObjects.length; i < l; i++) {
      //         if (typeof (RDFObjects[i].object) != "undefined") {
      //           data[j] = RDFObjects[i].object;
      //           j++;
      //         }

      //       }
      //       for (var i = 0, l = data.length; i < l; i++) {
      //         var unique = true;
      //         for (var j = 0, k = out.length; j < k; j++) {
      //           if (data[i] === out[j])
      //             unique = false;
      //         }
      //         if (unique) {
      //           out.push(data[i]);
      //         }
      //       }
      //       return out;
      //     }

      //     // translation of concept to URI
      //     function findURI(array, item) {
      //       var i = 0;
      //       while (array[i].concept != item) {
      //         i++;
      //       }
      //       return array[i].URI;
      //     }

      //     // Call Sort By Name
      //     RDFSdata.sort(SortConcepts);
      //     RDFSdata = uniqueConcepts(RDFSdata);
      //     RDFSdata.forEach(function(item) {
      //       treeData = treeData.concat(item);
      //     });

      //     var allRDFObjects = filterExternalConcept(RDFObjectsPlusURI);
      //     var allSKOSObjects = filterExternalConcept(SKOSObjectsPlusURI);
      //     var acceptHeader = req.headers['accept'];
      //     // check if the content-type is text-turtle to send the turtle code
      //     if (acceptHeader === 'text/turtle' ||
      //       acceptHeader === 'text/ntriples' ||
      //       acceptHeader === 'application/rdf+xml' ||
      //       acceptHeader === 'application/ld+json') {
      //       var searchConceptURI = "";
      //       // search the sent term in RDFSData and SKOSData as well in OWLIndividuals

      //       if (treeData) {
      //         const result = treeData.find(o => o.concept ===
      //           searchedConcept);
      //         if (result)
      //           searchConceptURI = result.URI;
      //       }
      //       if (SKOSData) {
      //         const result = SKOSData.find(o => o.concept ===
      //           searchedConcept);
      //         if (result)
      //           searchConceptURI = result.URI;
      //       }
      //       if (OWLIndividuals) {
      //         const result = OWLIndividuals.find(o => o.subject ===
      //           searchedConcept);
      //         if (result)
      //           searchConceptURI = result.subjectURI;
      //       }

      //       // if the term URI is found that means that we have some info to send to the requester
      //       if (searchConceptURI) {
      //         var queryObject = 'CONSTRUCT{<' + encodeURIComponent(
      //             searchConceptURI) + '> ?p ?o .}WHERE {<' +
      //           encodeURIComponent(searchConceptURI) + '> ?p ?o .}';
      //         var endpoint = "http:\/\/localhost:" + process.argv.slice(2)[
      //             1] || 3030 + "/dataset/sparql?query="
      //         request({
      //           url: endpoint + queryObject,
      //           headers: {
      //             'accept': acceptHeader
      //           },
      //         }, function(error, response, body) {
      //           if (error) {
      //             console.log('error:', error); // Print the error if one occurred

      //           } else if (response && body) {
      //             console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

      //             res.write("RDF code in " + acceptHeader + ":\n");
      //             res.write(
      //               "========================================================\n"
      //             );
      //             res.write(body);
      //             res.end();
      //           }
      //         })
      //       } else {
      //         res.send("No data is found ");
      //       }
      //     } else
      //       res.render('referenceRoutes', {
      //         title: 'referenceRoutes',
      //         data: treeData,
      //         allRDFObjects: allRDFObjects,
      //         allSKOSObjects: allSKOSObjects,
      //         SKOSData: SKOSData,
      //         RDFObjectsPlusURI: RDFObjectsPlusURI,
      //         SKOSObjectsPlusURI: SKOSObjectsPlusURI,
      //         OWLIndividuals: OWLIndividuals,
      //         referenceItem: searchedConcept
      //       });
      //   }
      // });

      // query to fuseki to getAllNamedGraphs
      request.get({
        headers: {
          'Accept': 'application/sparql-results+json;charset=UTF-8'
        },
        url: endpoint + '?query=' + allNamedGraphsQuery
      }, function(error, response, data) {
        if (!error && response.statusCode == 200) {
          var list = [];
          // Show the HTML for the Google homepage.
          if (data != null) {
            data = JSON.parse(data)

            var graphs = data.results.bindings;
            //console.log(graphs);
            if (graphs[0] != null) {
              for (var i = 0; i < graphs.length; i++) {
                list.push(graphs[i]["g"].value);
              }
              var namedGraphsList4Qurery = [];
              for (var i in list) {
                // console.log(list[i] + "\n");
                // filter with the current ontology name and branchName
                if (list[i].includes(instaceName + '/' + branchName + '/')) {
                  namedGraphsString4Qurery += "from named <" + list[i] +
                    ">\n";
                }
              }

            }
          }
        }
        console.log(namedGraphsString4Qurery);
        console.log(searchedConcept);
        res.render(
          'referenceRoutes', {
            title: 'searchedConcept',
            allRDFObjects: '[]',
            allSKOSObjects: '[]',
            SKOSData: '[]',
            RDFObjectsPlusURI: '[]',
            SKOSObjectsPlusURI: '[]',
            OWLIndividuals: '[]',
            fromNamedGraphs: namedGraphsString4Qurery,
            emptyData: false,
            referenceItem: searchedConcept
          });
      })
    }
  });
  module.exports = router;
