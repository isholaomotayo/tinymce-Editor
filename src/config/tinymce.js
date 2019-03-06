export default {

    toolbar: 'formatselect | bold italic strikethrough forecolor backcolor  | link image media  | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat | codesample code',
    plugins: [
        "code",
        "paste",
        "print",
        "preview",
        "searchreplace",
        "autolink",
        "visualblocks",
        "visualchars",
        "image",
        "link",
        "media",
        "template",
        "codesample",
        "charmap ",
        "hr ",
        "anchor ",
        "insertdatetime",
        "advlist",
        "lists",
        "wordcount",
        "spellchecker ",
        "imagetools ",
        "help",

    ],

    branding: false,

    imagetools_cors_hosts: ["*", "*.emergingpastetforms.com"],
    document_base_url: "http://www.example.com/path1/",
    height: 350,
    paste_as_text: false,

    convert_urls: false,
    file_picker_types: "file image ",
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
                let fname = blobInfo.name() + '.pdf'
                /* call the callback and populate the Title field with the file name */
                if (meta.filetype === 'file') {


                    function success(d) {
                        //console.log('success' + d)
                        cb(d, {
                                text: file.name
                            },

                        );
                    }

                    function failure() {
                        console.log('failure could not upload file')
                    }

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
                        success("http://uploads.test/" + json.location);
                    };
                    formData = new FormData();
                    formData.append("file", blobInfo.blob(), fname);
                    xhr.send(formData);



                }

                if (meta.filetype === 'image') {
                    cb(blobInfo.blobUri(), {
                        alt: file.name
                    });
                }


            };
            reader.readAsDataURL(file);
        };
        input.click();
    },

    images_upload_handler: function (
        blobInfo,
        success,
        failure,

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
            success("http://uploads.test/" + json.location);
        };
        formData = new FormData();
        formData.append("file", blobInfo.blob(), blobInfo.filename());
        xhr.send(formData);
    }
}