require(["N/query"], function (query) {
  var workbookId = "stdworkbookSalesInvoicedByWorkbook";

  var myLoadedQuery = query.load({
    id: workbookId, //workbook or dataset id
  });

  //executing the query
  var resultSet = myLoadedQuery.run();

  var results = resultSet.results;

  //displaying the query
  log.debug({
    title: "Query Length: ",
    details: results.length,
  });

  for (var i = 0; i < results.length; i++) {
    log.debug({
      title: results[i].values,
    });
  }
});
