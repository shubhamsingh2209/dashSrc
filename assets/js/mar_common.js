var host = window.location.hostname;
var addressdata=[];
function validateEmail12345(B) {
      if (B == "") {
          $(".alert_email").css('display','').html('*Email is empty');
          return false
      }
      var C = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!(C.test(B))) {
          $(".alert_email").css('display','').html('*Please provide valid email');
          return false;
      }
      return true;
    }
function validateName(e,n) {
    var a = e;
    var C = /^([a-zA-Z])+$/;
    if(a==""){
        $(".alert_name").css('display','').html('*'+n+' Name is compulsory');
      return false;      
    }else if(!urlExists(e)){
        $(".alert_name").css('display','').html('*Url is not allowed in '+n+' Name');
      return false;
    }
    else if(!(C.test(e))){
      $(".alert_name").css('display','').html('*Invalid '+n+' name');
      return false;
    }
    return true;
}
function conti(e) {
    e = e.replace(/[^0-9]/g, " ");
    var a = e.split(" ");
    for (i = 0; i < a.length; i++)
        if (a[i].length > 5) return !1;
    return !0
}
function urlExists(e) {
    if (e.indexOf("http") >= 0 || e.indexOf("www.") >= 0) return !1;
    var a = ["www", "com", "org", "net", "int", "edu", "gov", "mil", "arpa", "ac", "ad", "ae", "af", "ag", "ai", "al", "am", "an", "ao", "aq", "ar", "as", "at", "au", "aw", "ax", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bm", "bn", "bo", "br", "bs", "bt", "bv", "bw", "by", "bz", "ca", "cc", "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "cr", "cs", "cu", "cv", "cw", "cx", "cy", "cz", "dd", "de", "dj", "dk", "dm", "do", "dz", "ec", "ee", "eg", "eh", "er", "es", "et", "eu", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gm", "gn", "gp", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hm", "hn", "hr", "ht", "hu", "id", "ie", "il", "im", "in", "io", "ir", "is", "it", "je", "jm", "jo", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "ll", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mg", "mh", "mk", "ml", "mn", "mo", "mp", "mq", "mt", "mu", "mv", "mw", "mx", "my", "mz", "na", "nc", "ne", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om", "pa", "pe", "pf", "pg", "pk", "ph", "pl", "pm", "pn", "pr", "ps", "pt", "pw", "py", "qa", "re", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "sh", "si", "sj", "sk", "sl", "sm", "sn", "so", "sr", "ss", "st", "su", "sv", "sx", "sy", "sz", "tc", "td", "tf", "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tp", "tr", "tt", "tv", "tw", "tz", "ua", "ug", "uk", "us", "ui", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wf", "ws", "ye", "yt", "yu", "za", "zm", "zw"],
        t = e.split(".");
    if (1 == t.length) return !0;
    for (i = 0; i < t.length; i++)
        if (t[i] = t[i].toLowerCase(), $.inArray(t[i], a) >= 0) return !1;
    return !0
}
function loginregister(){
  var email=$('#userEmail').val();
  var n=validateEmail12345(email);
  if(n){
      showloader();
      var data={
               email:email,
               action:'login',
               password:$('#userPassword').val()
          }
      userdatahit(data,'login');   
   }
 }
 function signupregister(){
  var email=$('#userEmail').val();
  var n=validatedata();
  if(n){
      showloader();
      $('#emailid').val($('#userEmail').val());
      var data={
                firstName:$('#firstName').val(),
                lastName:$('#lastName').val(),
                email:$('#userEmail').val(),
                password:$('#userPassword').val(),
                action:'signup'
              }
       userdatahit(data,'signup');
   }
 }
function validatePassword(e) {
  var n=e.length;
  if(e==''){
    $(".alert_password").css('display','').html('*Password cannot be empty');
    return false;
  }
  if(n<8){
    $(".alert_password").css('display','').html('*Password should be more than 7');
    return false;
  }  
  return true;
}
 function validatedata(){
        var firstName=$('#firstName').val();
        var lastName=$('#lastName').val();
        var userEmail=$('#userEmail').val();
        var userPassword=$('#userPassword').val();
        var repeatPassword=$('#repeatPassword').val();
        var flag=0;
        if(!validateName(firstName,'First'))
           flag=1;
         else
          $(".alert_name").css('display','none').html('');
        if(!validateName(lastName,'Last'))
           flag=1;
         else
           $(".alert_name").css('display','none').html('');
        if(!validateEmail12345(userEmail))
           flag=1;
         else
          $(".alert_email").css('display','none').html('');
        if(!validatePassword(userPassword))
           flag=1;
          else
            $(".alert_password").css('display','none').html(''); 
        if(userPassword!=repeatPassword){
          flag=1;
          $('.alert_repeatpass').css('display','').html('*password did not match each other');
        }else{
          $(".alert_repeatpass").css('display','none').html('');
        }
        if(flag==1)
          return false;

        return true;
  }

 function userdatahit(Data,source){
    var result;
    $.ajax({ type: "POST",url: "/saveuser",data: Data,async: true,
      beforeSend: function(){},
            ajaxSend: function(){},
            complete: function(){},
            success: function(a) {
                a = $.parseJSON(a);
             switch(source){
              case 'login':
                    loginresponse(a);
                    break;
              case 'signup':
                    signupresponse(a);      
                    break;
              case 'reverify':
                    reverifyresponse(a);
                    break;
              case 'profileedit':
                    editresponse(a);
                    break; 
              default: 
                   break;
                }

             }
         });
   }

  function loginresponse(response){
      hideloader();
      if(response.status.code==1){
        if(response.data.profileverified==null || response.data.profileverified==0){
          $('#errordata').css('display','').html('<strong>Error!</strong>you have not verified your account.Please verified first.');
          }else{
             // if(response.data.phoneno==null)
             //    window.location.replace('/dashboard/edit')
             //  else
                window.location.replace('/index')
          }
      }else{
        if(response.status.code==0){
          if(response.status.message.wrong=='email' || response.status.message.invalid=='email')
          {
            $('#errordata').css('display','').html('<strong>Error!</strong>You have not registered yet.Signup first.'); 
          }else if(response.status.message.wrong=='password' || response.status.message.invalid=='password'){
            $('#errordata').css('display','').html('<strong>Error!</strong>Password wrong.'); 
          }
        }
      }
  }
  function signupresponse(response){
    if(response.status.code==1){
      hideloader();
      $('#verifyalert').css('display','');
      //$('#genModal').html(genricmodal());
      //$('#marvelmodal').modal('show');
    }else{
       alert('System error! Please try again');
    }
  }

  function showloader(){
    $('#loadingdata').css('display','');
    $('body').append('<div class="modal-backdrop  in"></div>');
  }
  function hideloader(){
    $('#loadingdata').css('display','none');
    $('.modal-backdrop').remove();
  }

  function genricmodal(){
    return '<div class="modal fade" id="marvelmodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"> <div class="modal-dialog" role="document"> <div class="modal-content modal-primary"> <div class="modal-header text-center"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h3 class="modal-title" id="myModalLabel"></h3> </div><div class="modal-body tentimes-form"></div></div></div></div>';
  }
  function sendverify(){
    var data={
           email:$('#emailid').val(),
           source:'reverify'
      }
    userdatahit(data,'reverify');
  }
  function reverifyresponse(response){
     if(response.status.code==1){
        $('#verifyalert').html('<p>*We have resend you a verification mail to you email. <a onclick="sendverify()">Resend link</a> </p>')
     }
  }
  function editdata(){
        var editflag=0;
        if($('#city').val()=='Select'){
          $('#city').css('border','1px solid #da542e');
          editflag=1;
        }else{
          $('#city').css('border','1px solid #e9ecef');
        }
        if($('#orgname').val()==''){
          $('#orgname').css('border','1px solid #da542e');
          editflag=1;
        }else{
          $('#orgname').css('border','1px solid #e9ecef');
        }
        if($('#desig').val()=='Select'){
          $('#desig').css('border','1px solid #da542e');
          editflag=1;
        }else{
          $('#desig').css('border','1px solid #e9ecef');
        }
        if($('#about').val()==''){
          $('#about').css('border','1px solid #da542e');
          editflag=1;
        }else{
          $('#about').css('border','1px solid #e9ecef');
        }
        if($('#contact').val()==''){
          $('#contact').css('border','1px solid #da542e');
          editflag=1;
        }else if(!checkMobile($('#contact').val())) {
          $('#contact').css('border','1px solid #da542e');
          editflag=1;
        }else{
          $('#contact').css('border','1px solid #e9ecef');
        } 
        if(editflag==0){       
           var data={
                    action:'profile',
                    email:$('#emailedit').attr('placeholder'),
                    location:$('#city').val(),
                    gender:$('input[name=radio-stacked]:checked').attr('id'),
                    phone:$('#contact').val(),
                    orgName:$('#orgname').val(),
                    orgDesignation:$('#desig').val(),
                    about:$('#about').val()
                  }
           userdatahit(data,'profileedit');
        }
   
  }
  function checkMobile(a) {
      a = $.trim(a);
      var C = /^([0-9])+$/;
      if(a == ""){
          return false
      }
      else if(!(C.test(a))){
          return false;
      }
      else if(a.length != 10) {
          return false;
      }
      return true;
  }

  function editresponse(response){
    if(response.status.code==1){
        window.location.replace('/dashboard/residence');
     }else{
        alert('something is break! Please try again later');
     }
  }
  function logout(){
    $.ajax({ type: "GET",url: "/logout",
            success: function(a) {    
               window.location.replace('/login');
       }
    });
  }
  $("#citydata").change(function(n){   // 1st
   var id=$(this).val();
   var location=$('#citydata option[value='+id+']').data('location').split(',');
   if(marker!=null){
       marker.setMap(null);
   }
   myLatlng=new google.maps.LatLng(parseFloat(location[0]), parseFloat(location[1]));
   marker = new google.maps.Marker({
      position: myLatlng,
      title: "Hello World!"
    });
   marker.setMap(map);
   map.setZoom(13);
   map.setCenter(myLatlng);
   marker.setDraggable(true);
    // marker.addListener('drag', handleEvent);
   marker.addListener('dragend', customEvent);
  
  });
function customEvent(event){
  var lat=event.latLng.lat();
  var long=event.latLng.lng();
  $('#residencelat').val(lat+','+long);
  if(getdistance_event(lat,long)<50000)
    geocodeLatLng(geocoder, map, infowindow,lat,long);
  else
    alert('please select the area within the city area');
}  
  function geocodeLatLng(geocoder, map, infowindow,lat,long) {
    var latlng = {lat: parseFloat(lat), lng: parseFloat(long)};
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          // map.setZoom(11);
          // var marker = new google.maps.Marker({
          //   position: latlng,
          //   map: map
          // });
        var finalhtml='<div id="string_html">'+results[0].formatted_address+'</div><a href="javascript:void(0);" style="float: right;border: 2px solid #4CAF50;background-color: #4CAF50;border: none;color: white;padding: 6px 10px;font-size: 16px;margin: 4px 2px;cursor: pointer;border-radius: 5px;" onclick="addressshow();">Use this address</a></div>';
          addressdata=results[0].address_components;
          infowindow.setContent(finalhtml);
          infowindow.open(map, marker);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
function addressshow(){  
  $('#addressuser').val($('#string_html').html());
  var pincodelast = jQuery.grep(addressdata, function( a ) {
    return a.types.includes('postal_code');
  });
  $('#pincode').val(pincodelast[0].long_name);
 }
function getdistance_event(lat,long) {
    var e = lat
      , t = long
      , a = $('#citydata option:selected').data('location');
    return showDistance(e, t, (a = a.split(","))[0], a[1])
}
function degreesToRadians(e) {
    return e * Math.PI / 180
}
function distanceInKmBetweenEarthCoordinates(e, t, a, i) {
    var o = degreesToRadians(a - e)
      , n = degreesToRadians(i - t);
    e = degreesToRadians(e),
    a = degreesToRadians(a);
    var s = Math.sin(o / 2) * Math.sin(o / 2) + Math.sin(n / 2) * Math.sin(n / 2) * Math.cos(e) * Math.cos(a);
    return 6371 * (2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s)))
}
function showDistance(e, t, a, i) {
    var o = distanceInKmBetweenEarthCoordinates(e, t, a, i);
    return Math.round(1e3 * o)
}
function residencedatasave(){
  if(residence_validation()){
    if($('#residencelat').val()==''){
      alert('Please select marker at your location');
      errorflag=1;
    }else{
      var residencelatlong=$('#residencelat').val().split(',');
    var location={
           'city':$('#citydata option:selected').val(),
           'houseNo':$('#houseno').val(),
           'block':$('#block').val(),
           'landmark':$('#landmark').val(),
           'pincode':$('#pincode').val(),
           'address':$('#addressuser').val(),
           'lat':residencelatlong[0],
           'lng':residencelatlong[1]
      }
      var data={
              'name':$('#residenceName').val(),
              'amenities':$('#resi_ament').val(),
              'furnishing':$('#resi_furn').val(),
              'roomCount':$('#roomcount').val(),
              'location':location,

        }
      $.ajax({ type: "POST",url: "/residentsave",data: data,async: true,
            success: function(a) {  
                a = $.parseJSON(a);
                if(a.status.code==1){
                  $('#residenceName').val(a.data.id);
                  $('#houseno').val(a.data.locality.houseno); 
                  $('#block').val(a.data.locality.block);
                  $('#landmark').val(a.data.locality.landmark);
                  $('#citydata').val(a.data.locality.city.id);
                  $('#addressuser').val(a.data.locality.address);
                  // $('#resi_ament').val();
                  $('#roomcount').val(a.data.room);
                  // $('#resi_furn').val();                  
                }
                 $("#residentshow").hide(500);
                 $('#residencedraft').parent().css('display','none');
                 $('#editresidencedraft').parent().css('display','block');
                 $('.countroomdata').show(500);
                 $("#editresidencedraft").click(function(){
                   $("#residentshow").show(500);
                   $('#residencedraft').parent().css('display','block');
                   $('#editresidencedraft').parent().css('display','none');

                });
             }
         });
       }
  }
}

function residence_validation(){
  var errorflag=0;
  if(!errorthrow('residenceName'))
    errorflag=1;
  if(!errorthrow('houseno'))
    errorflag=1;
  if(!errorthrow('block'))
    errorflag=1;
  if(!errorthrow('landmark'))
    errorflag=1;
  if(!errorthrow('addressuser'))
    errorflag=1;
  if(!errorthrow('pincode'))
    errorflag=1;
  if(!errorthrow('roomcount'))
    errorflag=1;
  if($('#citydata option:selected').val()=='Select City'){
    $('#citydata').parent().find('.invalid-feedback').css('display','block').html('required');
    $('#citydata').css('border','1px solid #da542e');
    errorflag=1;
   }else{
    $('#citydata').parent().find('.invalid-feedback').css('display','none');
   $('#citydata').css('border','1px solid #e9ecef');
   }
  if($('#resi_ament').val().length<1){
    $('#resi_ament').parent().find('.invalid-feedback').css('display','block').html('required');
    $('#resi_ament').css('border','1px solid #da542e');
    errorflag=1;
   }else{
    $('#resi_ament').parent().find('.invalid-feedback').css('display','none');
    $('#resi_ament').css('border','1px solid #e9ecef');
   }
   if($('#resi_furn').val().length<1){
    $('#resi_furn').parent().find('.invalid-feedback').css('display','block').html('required');
    $('#resi_furn').css('border','1px solid #da542e');
    errorflag=1;
   }else{
    $('#resi_furn').parent().find('.invalid-feedback').css('display','none');
    $('#resi_furn').css('border','1px solid #e9ecef');
  }
  if(errorflag==1)
    return false;
  else
    return true;


}
function errorthrow(val)
{  
  var required='required';
  if(val=='pincode'){
    var valid_text='Do not use any other key except number';
    var C = /^([0-9])+$/;
   }else{
    var valid_text='Do not use special character except \',\' and \'-\'';
    var C = /^([a-zA-Z0-9\s,-])+$/;
   }
   if($('#'+val).val()=='') {
     $('#'+val).parent().find('.invalid-feedback').css('display','block').html(required);
     $('#'+val).css('border','1px solid #da542e');
     return false;
   }else{
     if (!(C.test($('#'+val).val())) ){
        $('#'+val).parent().find('.invalid-feedback').css('display','block').html(valid_text);
        $('#'+val).css('border','1px solid #da542e');
         return false;
     }else{
        $('#'+val).parent().find('.invalid-feedback').css('display','none');
        $('#'+val).css('border','1px solid #e9ecef');
        return true;
     }
      
   }
}
    $(document).ready(function() {
        $('.minus').click(function () {
          var $input = $(this).parent().find('input');
          var count = parseInt($input.val()) - 1;
          count = count < 0 ? 0 : count;
          $input.val(count);
          $input.change();
          return false;
        });
        $('.plus').click(function () {
          var $input = $(this).parent().find('input');
          $input.val(parseInt($input.val()) + 1);
          $input.change();
          return false;
        });
        
      });

  function addroomblock(dis,value){
    if($(dis).parent().parent().parent().find('input').prop("checked")==true){
        var blockadd=$(dis).parent().parent().parent().find('.number input').val();
        if(blockadd>0){
        $.ajax({ type: "GET",url: window.location.href+"?ajax=1&blockadd="+blockadd+"&value="+value,
              success: function(a) {
                if(value=='single'){
                  $('.singleroomdata').show(500);
                  $('.singleroomdata').html(a);
                  $(".singleroomdata .select2").each(function(t){
                      $(this).select2();
                  });
                }
                if(value=='double'){
                  $('.doubleroomdata').show(500);
                  $('.doubleroomdata').html(a);
                  $(".doubleroomdata .select2").each(function(t){
                      $(this).select2();
                  });
                }
                if(value=='triple'){
                  $('.tripleroomdata').show(500);
                  $('.tripleroomdata').html(a);
                  $(".tripleroomdata .select2").each(function(t){
                                        $(this).select2();
                  });
                }
                if(value=='four'){
                  $('.fourroomdata').show(500);
                  $('.fourroomdata').html(a);
                  $(".fourroomdata .select2").each(function(t){
                      $(this).select2();
                  });
                }
                $('.lastsubmit').show();
                
               }
          });
      }else{
          alert('please increase the room count greater than 0');  
      }
    }else{
      alert('plese click the checkbox firrst');
      }
  }


  function similarrooms(dis,value){
    
    switch(value){
      case 'single':
          var single_room_value=parseInt($('.singleseater').find('input').val());
          var room_furnsing=$('.singleroomdata #dataroom_1').find('#singleroom_furn_1').val();
          var room_bath=$('.singleroomdata #dataroom_1').find('#singleroom_bath_1').val();
          var bed_furnsing=$('.singleroomdata #dataroom_1').find('#singlebed_furn_11').val();
          var manthchar=$('.singleroomdata #dataroom_1').find('.monthcharge11').val();
          var annualchar=$('.singleroomdata #dataroom_1').find('.annualcharge11').val();
          var tenure=$('.singleroomdata #dataroom_1').find('.tenure11').val();
          for(var i=2;i<=single_room_value;i++){
              $('.singleroomdata #dataroom_'+i).find('#singleroom_furn_'+i).val(room_furnsing).select2();
              $('.singleroomdata #dataroom_'+i).find('#singleroom_bath_'+i).val(room_bath).select2();
              $('.singleroomdata #dataroom_'+i).find('#singlebed_furn_'+i+'1').val(bed_furnsing).select2();
              $('.singleroomdata #dataroom_'+i).find('.monthcharge'+i+'1').val(manthchar);
              $('.singleroomdata #dataroom_'+i).find('.annualcharge'+i+'1').val(annualchar);
              $('.singleroomdata #dataroom_'+i).find('.tenure'+i+'1').val(tenure);
           } 
       break;
      case 'double':
          var double_room_value=parseInt($('.doubleseater').find('input').val());
          var room_furnsing=$('.doubleroomdata #dataroom_1').find('#doubleroom_furn_1').val();
          var room_bath=$('.doubleroomdata #dataroom_1').find('#doubleroom_bath_1').val();
          var bed_furnsing_1=$('.doubleroomdata #dataroom_1').find('#doublebed_furn_11').val();
          var bed_furnsing_2=$('.doubleroomdata #dataroom_1').find('#doublebed_furn_12').val();
          var manthchar1=$('.doubleroomdata #dataroom_1').find('.monthcharge11').val();
          var annualchar1=$('.doubleroomdata #dataroom_1').find('.annualcharge11').val();
          var tenure1=$('.doubleroomdata #dataroom_1').find('.tenure11').val();
          var manthchar2=$('.doubleroomdata #dataroom_1').find('.monthcharge12').val();
          var annualchar2=$('.doubleroomdata #dataroom_1').find('.annualcharge12').val();
          var tenure2=$('.doubleroomdata #dataroom_1').find('.tenure12').val();
          for(var i=2;i<=double_room_value;i++){
              $('.doubleroomdata #dataroom_'+i).find('#doubleroom_furn_'+i).val(room_furnsing).select2();
              $('.doubleroomdata #dataroom_'+i).find('#doubleroom_bath_'+i).val(room_bath).select2();
              $('.doubleroomdata #dataroom_'+i).find('#doublebed_furn_'+i+'1').val(bed_furnsing_1).select2();
              $('.doubleroomdata #dataroom_'+i).find('.monthcharge'+i+'1').val(manthchar1);
              $('.doubleroomdata #dataroom_'+i).find('.annualcharge'+i+'1').val(annualchar1);
              $('.doubleroomdata #dataroom_'+i).find('.tenure'+i+'1').val(tenure1);
              $('.doubleroomdata #dataroom_'+i).find('#doublebed_furn_'+i+'2').val(bed_furnsing_2).select2();
              $('.doubleroomdata #dataroom_'+i).find('.monthcharge'+i+'2').val(manthchar2);
              $('.doubleroomdata #dataroom_'+i).find('.annualcharge'+i+'2').val(annualchar2);
              $('.doubleroomdata #dataroom_'+i).find('.tenure'+i+'2').val(tenure2);
           } 
       break;
       case 'triple':
          var triple_room_value=parseInt($('.tripleseater').find('input').val());
          var room_furnsing=$('.tripleroomdata #dataroom_1').find('#tripleroom_furn_1').val();
          var room_bath=$('.tripleroomdata #dataroom_1').find('#tripleroom_bath_1').val();
          var bed_furnsing=[];
          var manthchar=[];
          var annualchar=[];
          var tenure=[];
          for(var j=1;j<=3;j++){
            bed_furnsing[j]=$('.tripleroomdata #dataroom_1').find('#triplebed_furn_1'+j).val();  
            manthchar[j]=$('.tripleroomdata #dataroom_1').find('.monthcharge1'+j).val();
            annualchar[j]=$('.tripleroomdata #dataroom_1').find('.annualcharge1'+j).val();
            tenure[j]=$('.tripleroomdata #dataroom_1').find('.tenure1'+j).val();
          }
          for(var i=2;i<=triple_room_value;i++){
              $('.tripleroomdata #dataroom_'+i).find('#tripleroom_furn_'+i).val(room_furnsing).select2();
              $('.tripleroomdata #dataroom_'+i).find('#tripleroom_bath_'+i).val(room_bath).select2();
              for(var k=0;k<=3;k++){
                $('.tripleroomdata #dataroom_'+i).find('#triplebed_furn_'+i+k).val(bed_furnsing[k]).select2();
                $('.tripleroomdata #dataroom_'+i).find('.monthcharge'+i+k).val(manthchar[k]);
                $('.tripleroomdata #dataroom_'+i).find('.annualcharge'+i+k).val(annualchar[k]);
                $('.tripleroomdata #dataroom_'+i).find('.tenure'+i+k).val(tenure[k]);
             }
           } 
       break;
       case 'four':
          var four_room_value=parseInt($('.fourseater').find('input').val());
          var room_furnsing=$('.fourroomdata #dataroom_1').find('#fourroom_furn_1').val();
          var room_bath=$('.fourroomdata #dataroom_1').find('#fourroom_bath_1').val();
          var bed_furnsing=[];
          var manthchar=[];
          var annualchar=[];
          var tenure=[];
          for(var j=1;j<=4;j++){
            bed_furnsing[j]=$('.fourroomdata #dataroom_1').find('#fourbed_furn_1'+j).val();  
            manthchar[j]=$('.fourroomdata #dataroom_1').find('.monthcharge1'+j).val();
            annualchar[j]=$('.fourroomdata #dataroom_1').find('.annualcharge1'+j).val();
            tenure[j]=$('.fourroomdata #dataroom_1').find('.tenure1'+j).val();
          }
          for(var i=2;i<=four_room_value;i++){
              $('.fourroomdata #dataroom_'+i).find('#fourroom_furn_'+i).val(room_furnsing).select2();
              $('.fourroomdata #dataroom_'+i).find('#fourroom_bath_'+i).val(room_bath).select2();
              for(var k=0;k<=4;k++){
                $('.fourroomdata #dataroom_'+i).find('#fourbed_furn_'+i+k).val(bed_furnsing[k]).select2();
                $('.fourroomdata #dataroom_'+i).find('.monthcharge'+i+k).val(manthchar[k]);
                $('.fourroomdata #dataroom_'+i).find('.annualcharge'+i+k).val(annualchar[k]);
                $('.fourroomdata #dataroom_'+i).find('.tenure'+i+k).val(tenure[k]);
             }
           } 
       break;
       default:
       break;
    }
  }

  function similarbed(dis){
    debugger;
    var roomtype='';
    var i=0;
    if($(dis).parent().parent().parent().parent().parent().hasClass('doubleroomdata')==true){
        roomtype='double';
        i=2;
    }
    else if($(dis).parent().parent().parent().parent().parent().hasClass('tripleroomdata')==true){
        roomtype='triple';
        i=3;
    }
    else if($(dis).parent().parent().parent().parent().parent().hasClass('fourroomdata')==true){
        roomtype='four';
        i=4;    
    }    
    var bed_furn=$(dis).parent().parent().parent().find('#'+roomtype+'bed_furn_11').val();
    var monthcharge=$(dis).parent().parent().parent().find('.monthcharge11').val();
    var annualcharge=$(dis).parent().parent().parent().find('.annualcharge11').val();
    var tenure=$(dis).parent().parent().parent().find('.tenure11').val();
    
    for(var k=2;k<=i;k++){
      $(dis).parent().parent().parent().parent().find('#'+roomtype+'bed_furn_1'+k).val(bed_furn).select2();
      $(dis).parent().parent().parent().parent().find('.monthcharge1'+k).val(monthcharge);
      $(dis).parent().parent().parent().parent().find('.annualcharge1'+k).val(annualcharge);
      $(dis).parent().parent().parent().parent().find('.tenure1'+k).val(tenure); 
    }
  }

  function finalsubmit() {
    if(validateroomdata()){
      var single_room_value=parseInt($('.singleseater').find('input').val());
      var double_room_value=parseInt($('.doubleseater').find('input').val());
      var triple_room_value=parseInt($('.tripleseater').find('input').val());
      var four_room_value=parseInt($('.fourseater').find('input').val());
    
      var romms=[];
      var k=0;
      if(single_room_value>0){
        for(var i=1;i<=single_room_value;i++){
              romms[k]['roomNo']=$('.singleroomdata #dataroom_'+i+' .roomno'+i).val();
              romms[k]['bedCount']=single_room_value;
              romms[k]['roomBathroom']=$('.singleroomdata #dataroom_'+i+' #singleroom_bath_'+i).val();
              romms[k]['roomFurnishing']=$('.singleroomdata #dataroom_'+i+' #singleroom_furn_'+i).val();
              romms[k]['roomType']=1;
              var beds=[];
              beds[0]['bedNo']= $('.singleroomdata #dataroom_'+i+' .bedno'+i+'1').val();
              beds[0]['bedFurnishing']= $('.singleroomdata #dataroom_'+i+' #singlebed_furn_'+i+'1').val();
              beds[0]['booking']['priceMonthly']=$('.singleroomdata #dataroom_'+i+' .monthcharge'+i+'1').val();
              beds[0]['booking']['priceYearly']=$('.singleroomdata #dataroom_'+i+' .annualcharge'+i+'1').val();
              beds[0]['booking']['bookingTenure']=$('.singleroomdata #dataroom_'+i+' .tenure'+i+'1').val();
              romms[k]['beds']=beds;
                k++;
          }
      }
      if(double_room_value>0){
        for(var i=1;i<=double_room_value;i++){
              romms[k]['roomNo']=$('.doubleroomdata #dataroom_'+i+' .roomno'+i).val();
              romms[k]['bedCount']=double_room_value;
              romms[k]['roomBathroom']=$('.doubleroomdata #dataroom_'+i+' #doubleroom_bath_'+i).val();
              romms[k]['roomFurnishing']=$('.doubleroomdata #dataroom_'+i+' #doubleroom_furn_'+i).val();
              romms[k]['roomType']=2;
              var beds=[];
              var m=0;
              for(var j=1;j<=2;j++){
                  beds[m]['bedNo']= $('.doubleroomdata #dataroom_'+i+'.bedno'+i+j).val();
                  beds[m]['bedFurnishing']= $('.doubleroomdata #dataroom_'+i+' #doublebed_furn_'+i+j).val();
                  beds[m]['booking']['priceMonthly']=$('.doubleroomdata #dataroom_'+i+' .monthcharge'+i+j).val();
                  beds[m]['booking']['priceYearly']=$('.doubleroomdata #dataroom_'+i+' .annualcharge'+i+j).val();
                  beds[m]['booking']['bookingTenure']=$('.doubleroomdata #dataroom_'+i+' .tenure'+i+j).val();
                m++;
              }
              romms[k]['beds']=beds;
              m=0;
              k++;
          }
      }
      if(triple_room_value>0){
        for(var i=1;i<=triple_room_value;i++){
              romms[k]['roomNo']=$('.doubleroomdata #dataroom_'+i+' .roomno'+i).val();
              romms[k]['bedCount']=triple_room_value;
              romms[k]['roomBathroom']=$('.doubleroomdata #dataroom_'+i+' #doubleroom_bath_'+i).val();
              romms[k]['roomFurnishing']=$('.doubleroomdata #dataroom_'+i+' #doubleroom_furn_'+i).val();
              romms[k]['roomType']=2;
              var beds=[];
              var m=0;
              for(var j=1;j<=2;j++){
                  beds[m]['bedNo']= $('.doubleroomdata #dataroom_'+i+'.bedno'+i+j).val();
                  beds[m]['bedFurnishing']= $('.doubleroomdata #dataroom_'+i+' #doublebed_furn_'+i+j).val();
                  beds[m]['booking']['priceMonthly']=$('.doubleroomdata #dataroom_'+i+' .monthcharge'+i+j).val();
                  beds[m]['booking']['priceYearly']=$('.doubleroomdata #dataroom_'+i+' .annualcharge'+i+j).val();
                  beds[m]['booking']['bookingTenure']=$('.doubleroomdata #dataroom_'+i+' .tenure'+i+j).val();
                m++;
              }
              romms[k]['beds']=beds;
              m=0;
              k++;
          }
      }
      if(four_room_value>0){
        for(var i=1;i<=four_room_value;i++){
              romms[k]['roomNo']=$('.fourroomdata #dataroom_'+i+' .roomno'+i).val();
              romms[k]['bedCount']=four_room_value;
              romms[k]['roomBathroom']=$('.fourroomdata #dataroom_'+i+' #fourroom_bath_'+i).val();
              romms[k]['roomFurnishing']=$('.fourroomdata #dataroom_'+i+' #fourroom_furn_'+i).val();
              romms[k]['roomType']=2;
              var beds=[];
              var m=0;
              for(var j=1;j<=2;j++){
                  beds[m]['bedNo']= $('.fourroomdata #dataroom_'+i+' .bedno'+i+j).val();
                  beds[m]['bedFurnishing']= $('.fourroomdata #dataroom_'+i+' #fourbed_furn_'+i+j).val();
                  beds[m]['booking']['priceMonthly']=$('.fourroomdata #dataroom_'+i+' .monthcharge'+i+j).val();
                  beds[m]['booking']['priceYearly']=$('.fourroomdata #dataroom_'+i+' .annualcharge'+i+j).val();
                  beds[m]['booking']['bookingTenure']=$('.fourroomdata #dataroom_'+i+' .tenure'+i+j).val();
                m++;
              }
              romms[k]['beds']=beds;
              m=0;
              k++;
          }
      }


    }

  }

  function validateroomdata(){
    var single_room_value=parseInt($('.singleseater').find('input').val());
    var double_room_value=parseInt($('.doubleseater').find('input').val());
    var triple_room_value=parseInt($('.tripleseater').find('input').val());
    var four_room_value=parseInt($('.fourseater').find('input').val());
    var valid_text1='*required';
    var valid_text2='Do not use special character except \',\' and \'-\'';
    var C = /^([a-zA-Z0-9\s,-])+$/;
    var D = /^([0-9])+$/;

    var validresult=0;
    if(single_room_value>0){
      for(var i=1;i<=single_room_value;i++){    
          if(!arrayValidation('singleroomdata','singleroom_furn_',i,'')) 
            validresult=1; 
          if(!arrayValidation('singleroomdata','singleroom_bath_',i,''))
            validresult=1;
          if(!arrayValidation('singleroomdata','singlebed_furn_',i,'1'))  
             validresult=1;
          if(!valuevalidation('singleroomdata','.monthcharge',i,'1','num'))  
             validresult=1;
          if(!valuevalidation('singleroomdata','.annualcharge',i,'1','num'))  
             validresult=1;
          if(!valuevalidation('singleroomdata','.tenure',i,'1','num')) 
             validresult=1;
          if(!valuevalidation('singleroomdata','.roomno',i,'','alpha')) 
             validresult=1;
          if(!valuevalidation('singleroomdata','.bedno',i,'1','alpha'))
             validresult=1;      
      }
    }

    if(double_room_value>0){
      for(var j=1;j<=double_room_value;j++){
          if(!arrayValidation('doubleroomdata','doubleroom_furn_',j,'')) 
            validresult=1;
          if(!arrayValidation('doubleroomdata','doubleroom_bath_',j,''))  
            validresult=1;
          if(!valuevalidation('doubleroomdata','.roomno',j,'','alpha'))
            validresult=1;

          for(k=1;k<=2;k++){
            if(!valuevalidation('doubleroomdata','.bedno',j,k,'alpha')) 
              validresult=1;
            if(!arrayValidation('doubleroomdata','doublebed_furn_',j,k))
              validresult=1;
            if(!valuevalidation('doubleroomdata','.monthcharge',j,k,'num'))
              validresult=1;  
            if(!valuevalidation('doubleroomdata','.annualcharge',j,k,'num'))  
              validresult=1;
            if(!valuevalidation('doubleroomdata','.tenure',j,k,'num'))
              validresult=1;            
          }
      }
    }
    if(triple_room_value>0){
      for(var j=1;j<=triple_room_value;j++){
          if(!arrayValidation('tripleroomdata','tripleroom_furn_',j,'')) 
            validresult=1;
          if(!arrayValidation('tripleroomdata','tripleroom_bath_',j,''))  
            validresult=1;
          if(!valuevalidation('tripleroomdata','.roomno',j,'','alpha'))
            validresult=1;

          for(k=1;k<=3;k++){
            if(!valuevalidation('tripleroomdata','.bedno',j,k,'alpha')) 
              validresult=1;
            if(!arrayValidation('tripleroomdata','triplebed_furn_',j,k))
              validresult=1;
            if(!valuevalidation('tripleroomdata','.monthcharge',j,k,'num'))
              validresult=1;  
            if(!valuevalidation('tripleroomdata','.annualcharge',j,k,'num'))  
              validresult=1;
            if(!valuevalidation('tripleroomdata','.tenure',j,k,'num'))
              validresult=1;            
          }
      }
    }
    if(four_room_value>0){
      for(var j=1;j<=four_room_value;j++){
          if(!arrayValidation('fourroomdata','fourroom_furn_',j,'')) 
            validresult=1;
          if(!arrayValidation('fourroomdata','fourroom_bath_',j,''))  
            validresult=1;
          if(!valuevalidation('fourroomdata','.roomno',j,'','alpha'))
            validresult=1;

          for(k=1;k<=4;k++){
            if(!valuevalidation('fourroomdata','.fourno',j,k,'alpha')) 
              validresult=1;
            if(!arrayValidation('fourroomdata','fourbed_furn_',j,k))
              validresult=1;
            if(!valuevalidation('fourroomdata','.monthcharge',j,k,'num'))
              validresult=1;  
            if(!valuevalidation('fourroomdata','.annualcharge',j,k,'num'))  
              validresult=1;
            if(!valuevalidation('four_room_value','.tenure',j,k,'num'))
              validresult=1;            
          }
      }
    }
     if(validresult==0){
       return true;
     }else{
      return false;
     }        
  }


 function arrayValidation(value1,value2,itr1,itr2){  
     if($('.'+value1+' #dataroom_'+itr1+' #'+value2+itr1+itr2).val().length<1){
        $('.'+value1+' #dataroom_'+itr1+' #'+value2+itr1+itr2).parent().parent().parent().find('.invalid-feedback').html('*required').css('display','block');
        return false;
      }else{
          $('.'+value1+' #dataroom_'+itr1+' #'+value2+itr1+itr2).parent().parent().parent().find('.invalid-feedback').html('*required').css('display','');
        return true;
      }
 }

 function valuevalidation(value1,value2,itr1,itr2,type){
    var valid_text1='*required';
    var C = /^([a-zA-Z0-9\s,-])+$/;
    var D = /^([0-9])+$/;
   if(type=='alpha'){
      var C = /^([a-zA-Z0-9\s,-])+$/;
      var valid_text2='Do not use special character except \',\' and \'-\'';
   }else{
      var C = /^([0-9])+$/;
      var valid_text2='Only numeric character is allowed';
   }


    if($('.'+value1+' #dataroom_'+itr1+' '+value2+itr1+itr2).val()==''){
        $('.'+value1+' #dataroom_'+itr1+' '+value2+itr1+itr2).parent().parent().parent().find('.invalid-feedback').html(valid_text1).css('display','block');
         return false;
      }else if(!(C.test($('.'+value1+' #dataroom_'+itr1+' '+value2+itr1+itr2).val() ) ) ) {
          $('.'+value1+' #dataroom_'+itr1+' '+value2+itr1+itr2).parent().parent().parent().find('.invalid-feedback').html(valid_text2).css('display','block');
        return false;
      } 
      else{
        $('.'+value1+' #dataroom_'+itr1+' '+value2+itr1+itr2).parent().parent().parent().find('.invalid-feedback').html(valid_text1).css('display','');
        return true;
      }
 }

 $(document).ready(function() {
 var table = $('#zero_config').DataTable({
  "language": {
    "emptyTable": '<span style="font-size: xx-large;">No ticket found<i class="mdi mdi-delete-empty" ></i></span>'
  }// },
  //  "ajax": {
  // 	"url": "/ajax?for=ticket&id=2",
  // 	"data": function ( d ) {
  //     				console.log(d)
  //  			}
  // }    
});
$('#zero_config tbody tr').css("cursor","pointer")
$('#zero_config tbody').on( 'click', 'tr', function () {
  // console.log(table.row( this ).data());
  
  swal({

      title: "",
      buttonsStyling: false,
       html:
          '<div class="card form-horizontal"> <div class="card-body"> <h4 class="card-title">Ticket No. '+table.row( this ).data()[0]+' '+table.row( this ).data()[3]+'</h4> <div class="form-group row"> <label for="fname" class="swal-input-group">Raised by:</label> <input type="text" class="form-control" value="'+table.row( this ).data()[6]+'" disabled="true"></div> <div class="form-group row"> <label for="lname" class="swal-input-group">Open on:</label> <input type="datetime" class="form-control opened-on" disabled="true" value="'+table.row( this ).data()[4]+'"> </div> <div class="form-group row"> <label for="lname" class="swal-input-group">Issue Type:</label> <input type="text" class="form-control" id="lname" placeholder="Issue Type" value="'+table.row( this ).data()[1]+'" disabled="disabled"> </div><div class="form-group row"> <label for="cono1" class="swal-input-group">Message</label> <textarea class="form-control" disabled="true">'+table.row( this ).data()[2]+'</textarea></div> </div> <div class="border-top">  </div> </div><div class="card"><form class="form-horizontal"><div class="card-body"><div class="form-group row"><label class="swal-input-group">Closed on:</label><input type="datetime" class="form-control closed-on" name="closed-on" placeholder="Please Select Closed Date"></div><div class="hide"><input type="text" name="ticket-id" value="'+table.row( this ).data()[0]+'"></div><div class="form-group row"><label class="swal-input-group">Comment:</label><textarea class="form-control" placeholder="Comment" name="comment"></textarea></div></div><div class="border-top"><div class="card-body"> <button type="button" class="btn btn-primary">Submit</button> </div></div></form></div>',
      confirmButtonClass: false,
      showCloseButton: false,
      showConfirmButton: false
  }).catch(swal.noop);
  jQuery('.opened-on').datetimepicker();
  
});

 });
