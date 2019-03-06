import Vue from 'vue'
import App from './App.vue'
import Editor from '@tinymce/tinymce-vue';
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver/theme';

// Any plugins you want to use has to be imported
import 'tinymce/plugins/image';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/media';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/code';
import 'tinymce/plugins/link';
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/print';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/template';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/help';
import 'tinymce/plugins/spellchecker';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/advlist';

Vue.component('editor', Editor)


Vue.config.productionTip = false


new Vue({
  data: function () {
    return {
      init: {
        branding: false,
        plugins: [
          "paste",
          "image",
          "imagetools",
          "media",
          "link",
          "code",
          "imagetools"
        ],
        imagetools_cors_hosts: ["*", "*.emergingplatforms.com"],

        height: 350,
        paste_as_text: true,
        toolbar: "undo redo | styleselect | bold italic | alignleft" +
          "aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | link " +
          "media  image  | code",
        convert_urls: false,
        file_picker_types: "file image media",
        automatic_uploads: true,
        images_upload_base_path: "http://uploads.test/",

        images_upload_url: "http://uploads.test",

        /* and here's our custom image picker*/
        file_picker_callback: function (cb, value, meta) {
          var input = document.createElement("input");
          input.setAttribute("type", "file");
          // input.setAttribute("accept", "image/*");
          input.setAttribute("accept", "image/* ,	application/pdf");

          input.onchange = function () {
            var file = this.files[0];
            var reader = new FileReader();
            reader.onload = function () {
              var id = "blobid" + new Date().getTime();
              var blobCache = tinymce.activeEditor.editorUpload.blobCache;
              var base64 = reader.result.split(",")[1];
              var blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);

              /* call the callback and populate the Title field with the file name */
              cb(blobInfo.blobUri(), {
                text: file.name
              });
            };
            reader.readAsDataURL(file);
          };
          input.click();
        },

        images_upload_handler: function (
          blobInfo,
          success,
          failure,
          images_upload_base_path
        ) {
          var xhr, formData;
          xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          xhr.open("POST", "http://uploads.test");
          xhr.onload = function () {
            var json;

            if (xhr.status != 200) {
              failure("HTTP Error: " + xhr.status);
              return;
            }
            json = JSON.parse(xhr.responseText);

            if (!json || typeof json.location != "string") {
              failure("Invalid JSON: " + xhr.responseText);
              return;
            }
            success(images_upload_base_path + json.location);
          };
          formData = new FormData();
          formData.append("file", blobInfo.blob(), blobInfo.filename());
          xhr.send(formData);
        }
      }
    };
  },
  render: h => h(App),
}).$mount('#app')