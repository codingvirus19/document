<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!doctype html>
<html>
<head>
<title>virus19 | main</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<script type="text/javascript" src="${pageContext.request.contextPath }/assets/jquery/jquery-3.4.1.js"></script>
<script src="./assets/js/app.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	$('#nav').mouseenter(function() {
		$( "#nav-g" ).css( "display", "block" );
	});
	$('#nav').mouseleave(function() {
		$( "#nav-g" ).css( "display", "none" );
	});
});

</script>
<style type="text/css">
* {
   margin: 0;
   padding: 0;
}

.header {
   display: block;
   width: 100%;
   display: flex;
   padding: 10px 10px 3px 0;
   border-bottom: 0.1em solid rgba(0, 0, 0, .2);
}

.logo-div {
   text-align: center;
   width: 11%;
}

.logo {
   width: 50px;
   height: 50px;
}

.logo-header-title p {
   color: #4C71DD;
   background: linear-gradient(180deg,#4e73df 10%,#224abe 100%);
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
   font-weight: bold;
   font-family: 'Product Sans',Arial,sans-serif;
   padding-top: 0.5rem;
}

.navigation {
   display: block;
   width: 11%;
   height: 100%;
   background-image: linear-gradient(180deg,#4e73df 10%,#224abe 100%);
   padding-top: 10px;
   position: fixed;
}

.navigation li {
   border-radius: 0 25px 25px 0;
   height: 50%;
   text-align: center;
   color: #fff;
   border-bottom: 0.1em solid rgba(0, 0, 0, .2);
   margin-top: 3px;
}
.navigation li a{
   padding: .3rem 0;
    margin: 0.5rem 0;
}

.navigation li div {
   display: block;
   margin: 0.7rem 1rem;
   background-color: #fff;
   position: relative;
    font-size: .85rem;
    border-radius: .35rem!important;
    line-height: 1.5;
    color: #3a3b45;
}

.navigation li div a {
   display:block
}

.contents, .contents-memo {
   display: inline-block;
   min-width: 0;
   width: 89%;
   float: right;
   background: transparent;
}

.contents-header {
   height: 10%;
}

.contents-memo {
   height: 90%;
}

.footer {
   width: 89%;
   right: 0px;
   position: absolute;
   bottom: 0px;
}

#nav-g {
    display: block;
    margin: 0.7rem 1rem;
    background-color: #fff;
    position: absolute;
    right: -90px;
    top: 10px;
    font-size: .85rem;
    border-radius: .35rem!important;
    line-height: 1.5;
    color: #3a3b45;
}

</style>
</head>
<body>
   <div id="container">
      <div class="header">
         <div class="logo-div">
            <div class='logo-header'>
               <img class='logo'
                  src="${pageContext.request.contextPath }/assets/images/logo.png" />
            </div>
            <div class='logo-header-title'>
               <p>ShareEditor.Md</p>
            </div>
         </div>
         
         <div class='search'>
            <form class='search-form' action=''>
               <input type='text' name='input-search'
                  class='input-search bg-light' placeholder='검색어를 입력하세요' /> <input
                  type='submit' class='search-submit' value='검색' />
            </form>
         </div>

         <div id='right-header'>
            <div id='header-addmemo'>
               <a href='#'>addmemo</a>
            </div>
            <div id='header-profile'>
               <a href='#'>profile</a>
            </div>
            <div id='header-bell'>
               <a href='#'>bell</a>
            </div>
         </div>
         
      </div>
   </div>
   <div class='navigation'>
      <ul>
         <li><a>개인메모</a>
            <div>
               <h6>Hashtag</h6>
               <a>해쉬테그</a>
               <a>해쉬테그2</a>
            </div>
         </li>
         <li>그룹메모
            <div>
               <h6>Hashtag</h6>
               <a>해쉬테그</a>
            </div>
            <div>
               <h6>Group</h6>
               <a id="nav">그룹1.</a>
               <div id="nav-g" style="display:none">
               	<a>권한설정</a>
              	<a>그룹나가기</a>
            	</div>
               <a id="nav">그룹2.</a>
            </div>
         </li>
      </ul>
   </div>

   <div class='contents'>
      <div class='contents-header'>
         <div id='contents-header-title'>
            <h3>
               <개인1>
            </h3>
         </div>
         <div id='contents-header-showinglist'>
            <a href='#'>showinglist</a>
         </div>
         <div id='contents-header-addgroup'>
            <a href='#'>addgroup</a>
         </div>
         <div id='contents-header-invite'>
            <a href='#'>invite</a>
         </div>
      </div>
      <div class='contents-memo'></div>
   </div>

   <div class="footer">
      <p>(c)opyright 2015, 2016, 2017, 2018, 2019, 2020</p>
   </div>
</body>
</html>