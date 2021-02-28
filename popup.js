window.onload = function () {
   document.querySelector('#download').onclick = function () {
      let javaPage = document.querySelector('#javaPage');
      let dataDictionary = document.querySelector('#dataDictionary');
      
      if (javaPage.checked) {
         downloadJavaPage();
      }

      if (dataDictionary.checked) {
         downloadDataDictionary();
      }

      this.blur();
   }
}