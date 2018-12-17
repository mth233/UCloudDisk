result.blob().then(blob => {

    var fileName = result.headers.get('Content-Disposition').split('=')[1];

    var url = window.URL.createObjectURL(blob); // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)    
    var a = document.createElement('a');
    a.href = url;
    a.download = decodeURIComponent(fileName);

    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 1000);


    //var reader = new FileReader();
    //reader.readAsDataURL(blob);
    //reader. = function (e) {
    //    var a = document.createElement('a');
    //    a.download =decodeURIComponent(fileName);
    //    a.href = e.target.result;
    //    a.click();
    //}
});
