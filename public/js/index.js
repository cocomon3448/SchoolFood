function ajaxCallApiTest(url, param, callback) {
    $.ajax({
        url: url,
        async: false,
        type: 'POST',
        data: param,
        dataType: 'json',
        success: callback,
        error:function(request, textStatus) {
                var format = new OpenLayers.Format.WFSDescribeFeatureType();
                var doc = request.responseXML;
                var describeFeatureType = format.read(doc);
            }
    });
        
}

var dietinfo_D = [];
var todaymeal;
var num = 1;
function ApiCallBack(json) {
    console.log(num)
    if(json.mealServiceDietInfo != null ) {
        dietinfo_D = [];
        console.log(json.mealServiceDietInfo[1].row[0]);
        todaymeal = json.mealServiceDietInfo[1].row[0];
        dietinfo_D.push(todaymeal.DDISH_NM,todaymeal.NTR_INFO + '</br></br>열량(Kcal) : ' + todaymeal.CAL_INFO,week[num])
        console.log(dietinfo_D);
        displaySet(dietinfo_D);
        num++;
    } else {
        dietinfo_D = ["배식 안함","정보를 불러올 수 없습니다",week[num]];
        displaySet(dietinfo_D);
        num++;
    }

    if(num == 6) {
        num = 1;
        document.getElementById("loading").innerHTML = "<kbd>&nbsp;Made by 조민석&nbsp;";
    }
}
function weekdateset(weekdate, param){
    weekdate.forEach((weeksome)=>{
    if(weekdate[0] == weeksome || weekdate[6] == weeksome) {
        return;
    }
    url = "https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=6d1a1a9e286f4f8b998170453f1972e2&Type=json&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7569056&MLSV_YMD="+weeksome;
    ajaxCallApiTest(url, param, ApiCallBack);
  })
}

function displaySet(dietinfo_D) {
    var templete = `<tr>
        <th scope="row"">${dietinfo_D[2]}</th>
        <td>${dietinfo_D[0]}</td>
        <td>${dietinfo_D[1]}</td>
    </tr>`

    $('.table-container').append(templete)
}