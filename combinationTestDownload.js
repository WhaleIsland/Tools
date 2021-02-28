chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
   if (request.todo == "download") {
      if (request.downloadFile[0]) {
         downloadJavaPage();
      }

      if (request.downloadFile[1]) {
         downloadDataDictionary();
      }
   }
})

function downloadJavaPage() {
   console.log("// TODO downloadJavaPage");
}

function downloadDataDictionary() {

   let nodes = document.all;
   for (let node of nodes) {
      if (node.nodeType = 1) {
         switch(node.nodeName) {
            case "A":
               console.log(node.href)
               break;
            default:
               // nothing to do ..
         }
      }
   }

   console.log("// TODO downloadDataDictionary");
}
