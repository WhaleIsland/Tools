var nodes = document.all;

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
   
   let elementName;
   let javaPage = '';
   let inputElement = '\n\
      public void setParam(String value){\n\
         setValue("value", value);\n\
      }\n';

   let redioElement = '\n\
      public void selectParam(String valueLabel){\n\
         selectRadio("value", valueLabel, check);\n\
      }n';

   let aElement = '\n\
      public <T extend BaseBackendPage> T clickParamLink(){\n\
         return clickButton($(By.linkText("text")));\n\
      }\n';

   let btnElement = '\n\
      <T extend BaseBackendPage> T clickParamButton(){\n\
         return clickButton(submitButton);\n\
      }\n';

   function getChild(node) {
      if (node.childElement) {
         getChild(node.children);
      } 
      return node.innerText;
   }

   function getParent(node) {
      let parentID = node.parentNode.getAttribute('id');
      if (parentID == null) {
         parentID = node.parentNode.parentNode.getAttribute('id');
      }
      return parentID;
   }

   function upperFirst(param) {
         return param.substr(0, 1).toUpperCase() + param.substr(1);
   }

   function replaceValue(value = 'value', element, name, text) {
      let val = element.replace(/value/g, value);
      try{
         let param = (name != null && name != undefined) ? upperFirst(name) : upperFirst(value);
         val = val.replace(/Param/g, param);
         val = val.replace(/name/g, name);
         val = val.replace(/text/g, text);
      } catch (err) {
         console.log(err);
      }
      
      if (text == '') {
         return;
      }

      javaPage += val;
   }

   for (let node of nodes) {
      if (node.getAttribute('type') != 'hidden'
         && node.offsetParent != null) {
         switch (node.nodeName) {
            case 'INPUT':
               switch (node.getAttribute('type')) {
                  case 'radio':
                     if (node.getAttribute('name') != elementName) {
                        elementName = node.getAttribute('name');
                     }
                     replaceValue(elementName, redioElement);
                     break;
                  case 'checkbox':
                     let groupName = getParent(node);
                     replaceValue(elementName, checkboxElement, groupName);
                     break;
                  default:
                     elementName = node.getAttribute('name');
                     replaceValue(elementName, inputElement);
                     break;
               }
               break;
            case 'A':
               elementName = node.getAttribute('name');
               let text = getChild('node');
               replaceValue(elementName, aElement, text);
               break;
            case 'BUTTON':
               elementName = node.getAttribute('name');
               replaceValue(elementName, btnElement);
               break;
            default:
               continue;
         }
      }
   }

   downloadFile(javaPage, '.java');
}

function downloadDataDictionary() {
   for (let node of nodes) {
      if (node.nodeType = 1) {
         switch(node.nodeName) {
            case "A":
               break;
            default:
               // nothing to do ..
         }
      }
   }

   console.log("// TODO downloadDataDictionary");
}

function downloadFile(file, fix) {
   const urlObject = window.URL || window.webkitURL || window;
   let export_blob = new Blob([file]);
   let save_link = document.createElement('a');
   let name = window.location.pathname;
   name = name.substr(name.lastIndexOf('/'));
   save_link.href = urlObject.createObjectURL(export_blob);
   save_link.download = name + fix;
   save_link.style.display = 'none';
   document.body.appendChild(save_link);
   save_link.click();
   document.body.removeChild(save_link);
}
