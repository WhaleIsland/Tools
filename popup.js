window.onload = function () {
   document.querySelector('#download').onclick = function () {
      let javaPage = document.querySelector('#javaPage');
      let dataDictionary = document.querySelector('#dataDictionary');
      
      chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
         chrome.tabs.sendMessage(tabs[0].id, {
            todo: "download", downloadFile: [javaPage.checked, dataDictionary.checked]
         });
      })
      this.blur();
   }
}