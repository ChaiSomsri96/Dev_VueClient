<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'Form Sample page 2'"/>
    <!-- body 영역 -->
    <div class="content-body">
      <span id="_snbMenuUrl" data-menuurl="/mbr/manager/partTime/members"></span>
      <div>
        <div class="col-6 p-0"></div>
        <div class="col-6 p-0">
          <span class="pull-right ess front p1 mt-7">필수 입력</span>
        </div>
      </div>
      <div id="default">
        <input type="hidden" name="empId" id="empId" value="64f2aa10-089b-4e89-999a-464f15cc4962">
        <div class="form-wrap">
          <div class="form-group row">
            <label class="form-label type2 col-2 mt-6">
              <span>사진 등록</span>
            </label>
            <div class="row col-6">
              <div class="image-box">
                <div class="input-group dropdown ">
                  <a href="javascript:void(0);" class="image-edit">
                    <div class="box-profile">
                      <img id="employeeImage" data-target="#component_photo_upload1" data-emp-id="64f2aa10-089b-4e89-999a-464f15cc4962" data-file-id="" width="70px" height="70px" src="http://ss.dev-ncpworkplace.com/uikit/dist/img/ico-profile.svg" onerror="g_nwpCom.onImgError(this, 'http://ss.dev-ncpworkplace.com/uikit/dist/img/ico-profile.svg')" alt="이미지">
                      <input type="file" name="photoFile" class="blind" id="component_photo_upload1">
                      <input type="hidden" name="photoId" value="">
                    </div>
                  </a>
                  <div class="dropdown-menu dropdown-menu-scale min-w-105 mt-10">
                    <label class="dropdown-item" for="component_photo_upload1">
                      사진 변경</label>
                    <a class="dropdown-item" id="_photo_delete">
                      사진 삭제</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label type2 col-2">
              <span class="ess">이름<span class="blind">필수</span></span>
              <button type="button" class="btn btn-s flat solid ml-6 _modify_button" data-type="empName" data-target="input[name^='empName'],input[name='rubyTypeNm']" data-msg="이름을 변경하겠습니까?">
                <i class="icon-solidIcon-edit">
                  <span class="blind">수정</span>
                </i>
              </button>
            </label>
            <div class="row col-6">
              <input type="text" autocomplete="off" class="form-control" name="empNameOrg" value="cgv알바생" required="required" disabled="">
            </div>
          </div>
          <h3 class="title-wrap">
            <span>언어별 이름</span>
            <input type="hidden" name="empNm" class="form-control">
          </h3>
          <div class="form-group row">
            <label class="form-label col-2" for="empNameKr">
              <span>한국어</span>
            </label>
            <div class="row col-6">
              <div class="input-group">
                <input id="empNameKr" name="empNameKr" type="text" class="form-control" maxlength="100" value="" disabled="">
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label col-2" for="empNameEn">
              <span>English</span>
            </label>
            <div class="row col-6">
              <div class="input-group">
                <input id="empNameEn" name="empNameEn" type="text" class="form-control" maxlength="100" value="" disabled="">
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label col-2" for="empNameJp">
              <span>일본어</span>
            </label>
            <div class="row col-6">
              <div class="input-group">
                <input id="empNameJp" name="empNameJp" type="text" class="form-control" maxlength="100" value="" disabled="">
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label col-2" for="empNameCh">
              <span>중국어(간체)</span>
            </label>
            <div class="row col-6">
              <div class="input-group">
                <input id="empNameCh" name="empNameCh" type="text" class="form-control" maxlength="100" value="" disabled="">
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label col-2" for="empNameTw">
              <span>중국어(번체)</span>
            </label>
            <div class="row col-6">
              <div class="input-group">
                <input id="empNameTw" name="empNameTw" type="text" class="form-control" maxlength="100" value="" disabled="">
              </div>
            </div>
          </div>
        </div>
        <div class="form-wrap">
          <div class="form-group row">
            <label class="form-label type2 col-2" for="loginId">
              <span class="ess v-m">로그인 아이디</span>
              <button type="button" class="btn btn-s flat solid ml-6 _modify_button" data-type="loginId" data-target="input[name='loginId']" data-msg="로그인 아이디를 변경하시겠습니까?">
                <i class="icon-solidIcon-edit"><span class="blind">수정</span></i>
              </button>
            </label>
            <div class="col-6">
              <div class="input-group">
                <input type="text" autocomplete="off" class="form-control" maxlength="100" value="cgv_part01@cgv.co.kr" name="loginId" placeholder="로그인 아이디로 사용할 메일 주소를 입력하세요" data-group="" required="required" disabled="">
              </div>
              <h5 class="mt-5">
                <label for="loginIdToMail">
                  <input type="checkbox" id="loginIdToMail">
                  <i class="black"></i>로그인 아이디를 메일로 저장</label>
              </h5>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label type2 col-2" for="emailAddr">
              <span class="ess v-m">메일</span>
            </label>
            <div class="col-6">
              <div class="input-group">
                <input type="text" autocomplete="off" class="form-control" name="emailAddr" placeholder="로그인 정보를 찾는 용도로 사용할 수 있습니다." value="cgv_part01@cgv.co.kr" required="required">
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label type2 col-2 PHONE">
              <span>휴대폰</span>
            </label>
            <div class="row col-2">
              <div class="input-group dropdown scroll" uikit="dropdown">
                <input type="hidden" name="cphCtryCd" id="cd" value="KR">
                <button type="button" class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="대한민국 (+82)">대한민국 (+82)<i class="icon-lineIcon-line-arrow-down"></i></button>
                <div class="dropdown-menu dropdown-menu-scale">
                  <div class="ndk-scrollbar">
                    <a class="dropdown-item selected" href="javascript:void(0);" value="KR">대한민국 (+82)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="PR">푸에르토리코 (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="PS">팔레스타인 (+970)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="PT">포르투칼 (+351)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="PW">팔라우 (+680)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="PY">파라과이 (+595)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="QA">카타르 (+974)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="AC">AC (+247)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="AD">안도라 (+376)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="AE">아랍에미리트 (+971)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="AF">아프가니스탄 (+93)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="AG">앤티가 바부다 (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="AI">안길라 (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="AL">알바니아 (+355)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="AM">아르메니아 (+374)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="AO">앙골라 (+244)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="AR">아르헨티나 (+54)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="AS">미국령 사모아 (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="AT">오스트리아 (+43)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="RE">리유니언 (+262)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="AU">오스트레일리아 (+61)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="AW">아루바 (+297)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="AX">올란드 제도 (+358)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="AZ">아제르바이잔 (+994)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="RO">루마니아 (+40)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="BA">보스니아 헤르체고비나 (+387)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="BB">바베이도스 (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="RS">세르비아 (+381)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="BD">방글라데시 (+880)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="RU">러시아 (+7)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="BE">벨기에 (+32)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="BF">부르키나파소 (+226)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="RW">르완다 (+250)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="BG">불가리아 (+359)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="BH">바레인 (+973)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="BI">부룬디 (+257)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="BJ">베넹 (+229)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="BL">생 바르텔레미 (+590)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="BM">버뮤다 (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="BN">브루나이 (+673)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="BO">볼리비아 (+591)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="SA">사우디아라비아 (+966)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="BQ">보네르, 신트유스타티우스, 사바 제도 (+599)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="SB">솔로몬 제도 (+677)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="BR">브라질 (+55)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="SC">쉐이쉘 (+248)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="BS">바하마 (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="SD">수단 (+249)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="SE">스웨덴 (+46)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="BT">부탄 (+975)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="SG">싱가포르 (+65)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="BW">보츠와나 (+267)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="SH">세인트 헬레나 (+290)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="SI">슬로베니아 (+386)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="SJ">스발바르 및 얀마웬 (+47)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="BY">벨라루스 (+375)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="SK">슬로바키아 (+421)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="BZ">벨리즈 (+501)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="SL">시에라리온 (+232)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="SM">산마리노 (+378)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="SN">세네갈 (+221)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="SO">소말리아 (+252)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="CA">캐나다 (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="SR">수리남 (+597)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="CC">코코스 군도 (+61)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="SS">남수단 (+211)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="ST">상투메 프린시페 (+239)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="CD">콩고 민주 공화국 (+243)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="CF">중앙 아프리카 (+236)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="SV">엘살바도르 (+503)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="CG">콩고 (+242)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="SX">신트마르텐(네덜란드령) (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="CH">스위스 (+41)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="CI">코트디부와르 (+225)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="SY">시리아 (+963)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="SZ">스와질랜드 (+268)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="CK">쿡 제도 (+682)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="CL">칠레 (+56)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="CM">카메룬 (+237)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="CN">중국 (+86)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="CO">콜롬비아 (+57)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="TA">TA (+290)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="TC">터크스 케이커스 제도 (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="CR">코스타리카 (+506)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="TD">차드 (+235)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="CU">쿠바 (+53)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="TG">토고 (+228)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="CV">까뽀베르데 (+238)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="TH">태국 (+66)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="CW">퀴라소 (+599)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="CX">크리스마스 섬 (+61)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="CY">사이프러스 (+357)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="TJ">타지키스탄 (+992)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="TK">토켈라우 (+690)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="CZ">체코 (+420)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="TL">동티모르 (+670)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="TM">투르크메니스탄 (+993)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="TN">튀니지 (+216)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="TO">통가 (+676)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="TR">터키 (+90)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="TT">트리니다드 토바고 (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="DE">독일 (+49)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="TV">투발루 (+688)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="TW">대만 (+886)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="DJ">지부티 (+253)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="TZ">탄자니아 (+255)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="DK">덴마크 (+45)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="DM">도미니카 (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="DO">도미니카 공화국 (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="UA">우크라이나 (+380)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="UG">우간다 (+256)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="DZ">알제리 (+213)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="US">미국 (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="EC">에쿠아도르 (+593)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="EE">에스토니아 (+372)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="EG">이집트 (+20)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="EH">서사하라 (+212)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="UY">우루과이 (+598)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="UZ">우즈베키스탄 (+998)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="VA">바티칸 (+39)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="VC">세인트 빈센트 그레나딘스 (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="ER">에리트리아 (+291)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="ES">스페인 (+34)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="VE">베네수엘라 (+58)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="ET">이디오피아 (+251)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="VG">영국령 버진 아일랜드 (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="VI">미국령 버진 아일랜드 (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="VN">베트남 (+84)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="VU">바누아투 (+678)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="FI">핀란드 (+358)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="FJ">피지 (+679)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="FK">포클랜드 제도 (+500)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="FM">마이크로네시아 (+691)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="FO">페로 제도 (+298)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="FR">프랑스 (+33)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="WF">윌리스 푸투나 (+681)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="GA">가봉 (+241)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="GB">영국 (+44)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="WS">사모아 (+685)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="GD">그레나다 (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="GE">그루지야 (+995)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="GF">프랑스령 기아나 (+594)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="GG">건지 (+44)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="GH">가나 (+233)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="GI">지브롤터 (+350)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="GL">그린랜드 (+299)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="GM">감비아 (+220)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="GN">기니 (+224)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="GP">과달로프 (+590)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="GQ">적도 기니 (+240)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="GR">그리스 (+30)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="GT">과테말라 (+502)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="GU">괌 (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="GW">기네비쏘 (+245)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="GY">가이아나 (+592)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="XK">XK (+383)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="HK">홍콩 (+852)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="HN">온두라스 (+504)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="HR">크로아티아 (+385)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="YE">예멘 (+967)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="HT">하이티 (+509)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="HU">헝가리 (+36)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="ID">인도네시아 (+62)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="YT">마요티 (+262)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="IE">아일랜드 (+353)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="IL">이스라엘 (+972)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="IM">맨 섬 (+44)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="IN">인도 (+91)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="IO">영인도 제도 (+246)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="ZA">남아프리카 (+27)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="IQ">이라크 (+964)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="IR">이란 (+98)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="IS">아이슬란드 (+354)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="IT">이탈리아 (+39)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="ZM">잠비아 (+260)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="JE">저지 (+44)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="ZW">짐바브웨 (+263)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="JM">자메이카 (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="JO">요르단 (+962)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="JP">일본 (+81)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="KE">케냐 (+254)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="KG">키르기스스탄 (+996)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="KH">캄보디아 (+855)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="KI">키리바시 (+686)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="KM">코모르 (+269)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="KN">세인트 크리스토퍼 니비스 (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="KP">북한 (+850)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="KW">쿠웨이트 (+965)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="KY">케이맨 제도 (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="KZ">카자흐스탄 (+7)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="LA">라오스 (+856)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="LB">레바논 (+961)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="LC">세인트 루시아 (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="LI">리히텐슈타인 (+423)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="LK">스리랑카 (+94)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="LR">라이베리아 (+231)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="LS">레소토 (+266)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="LT">리투아니아 (+370)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="LU">룩셈부르크 (+352)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="LV">라트비아 (+371)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="LY">리비아 (+218)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="MA">모로코 (+212)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="MC">모나코 (+377)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="MD">몰도바 (+373)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="ME">몬테네그로 (+382)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="MF">생 마르탱 (+590)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="MG">마다가스카르 (+261)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="MH">마셜 제도 (+692)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="MK">마케도니아어 (+389)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="ML">말리 (+223)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="MM">미얀마 (+95)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="MN">몽골 (+976)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="MO">마카오 (+853)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="MP">북마리아나 제도 (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="MQ">말티니크 (+596)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="MR">모리타니 (+222)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="MS">몬트세라트 (+1)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="MT">몰타 (+356)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="MU">모리셔스 (+230)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="MV">몰디브 (+960)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="MW">말라위 (+265)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="MX">멕시코 (+52)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="MY">말레이지아 (+60)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="MZ">모잠비크 (+258)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="NA">나미비아 (+264)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="NC">뉴 칼레도니아 (+687)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="NE">니제르 (+227)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="NF">노퍽 섬 (+672)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="NG">나이지리아 (+234)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="NI">니카라과 (+505)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="NL">네덜란드 (+31)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="NO">노르웨이 (+47)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="NP">네팔 (+977)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="NR">나우루 (+674)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="NU">니우에 (+683)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="NZ">뉴질랜드 (+64)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="OM">오만 (+968)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="PA">파나마 (+507)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="PE">페루 (+51)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="PF">프랑스령 폴리네시아 (+689)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="PG">파푸아뉴기니 (+675)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="PH">필리핀 (+63)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="PK">파키스탄 (+92)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="PL">폴란드 (+48)</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="PM">세인트 피에르 미켈론 (+508)</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="row col-4">
              <div class="input-group">
                <input type="text" autocomplete="off" class="form-control" name="cphNo" placeholder="숫자 () - * # + P T 만 입력해 주세요." value="">
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label type2 col-2 TEL">
              <span>회사 전화번호</span>
            </label>
            <div class="row col-6">
              <div class="input-group">
                <input type="text" autocomplete="off" class="form-control" name="telNo" placeholder="숫자 () - * # + P T 만 입력해 주세요." value="">
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label type2 col-2 PT_PLACE">
              <span class="ess">업장<span class="blind">필수</span></span>
            </label>
            <div class="row col-6">
              <div class="input-group dropdown scroll" uikit="dropdown">
                <input type="hidden" name="ptPlaceId" value="40" data-valid-pt-place-id="Y" required="required">
                <button type="button" class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="A Store">A Store<i class="icon-lineIcon-line-arrow-down"></i></button>
                <div class="dropdown-menu dropdown-menu-scale">
                  <div class="ndk-scrollbar">
                    <a class="dropdown-item selected" href="javascript:void(0);" value="40">A Store</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="67">BBC Store1</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="33">C Store"&gt;AA&lt;img src=1 onerror=alert(1)&gt;AA"</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="65">F Store</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="66">G Store</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="61">ㅁㄴㅇㄹ</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="62">ㅁㄴㅇㄹ2</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="63">ㅁㄴㅇㄹ3</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="31">업장_한국</a>
                    <a class="dropdown-item" href="javascript:void(0);" value="51">판교 업장 한국어 1</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-wrap">
          <div class="form-group row">
            <label class="form-label type2 col-2 CONT_STA_YMD">
              <span class="ess">계약 시작일<span class="blind">필수</span></span>
              <button type="button" class="btn btn-s flat solid ml-6 _modify_button" data-type="contStaYmd" data-target="input[name='contStaYmd'],#component_calendar1" data-msg="계약 시작일을 변경하시겠습니까?">
                <i class="icon-solidIcon-edit"><span class="blind">수정</span></i>
              </button>
            </label>
            <div class="row col-4">
              <div class="input-group date">
                <input type="text" class="form-control component_calendar" autocomplete="off" id="contStaYmd" name="contStaYmd" data-date-format="yyyy.MM.dd" data-in="Y" data-standby="N" value="2021.01.04" baap-single-datepicker-custom="" required="required" disabled="">
                <button type="button" class="input-group-addon calendar btn btn-s white" id="component_calendar1" disabled="">
                  <i class="icon-lineIcon-calendar"><span class="blind">달력</span></i>
                </button>
                <div class="daterangepicker dropdown-menu ltr single opensright"><div class="time-line" style="display: none;"></div><div class="calendar left single" style="display: block;"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_start" value="" style="display: none;"><i class="fa fa-calendar glyphicon glyphicon-calendar" style="display: none;"></i><div class="calendar-time" style="display: none;"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="input-group-wrap" style="display: none;"><div class="input-group time"></div></div><div class="calendar-table"></div></div><div class="calendar right" style="display: none;"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_end" value="" style="display: none;"><i class="fa fa-calendar glyphicon glyphicon-calendar" style="display: none;"></i><div class="calendar-time" style="display: none;"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="input-group-wrap" style="display: none;"><div class="input-group time"></div></div><div class="calendar-table"></div></div><div class="ranges" style="display: none;"><div class="range_inputs"><button class="cancelBtn white btn btn-md mh-3" type="button"><i class="icon-lineIcon-close mr-5"></i>취소</button><button class="applyBtn black btn btn-md mh-3" disabled="disabled" type="button"><i class="icon-lineIcon-check mr-5"></i>적용</button> </div></div></div></div>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label type2 col-2 CONT_END_YMD">
              <span class="ess">계약 종료일<span class="blind">필수</span></span>
              <button type="button" class="btn btn-s flat solid ml-6 _modify_button" data-type="contEndYmd" data-target="input[name='contEndYmdNull']" data-target2="input[name='contEndYmd'],#component_calendar2" data-msg="계약 종료일을 변경하시겠습니까?">
                <i class="icon-solidIcon-edit"><span class="blind">수정</span></i>
              </button>
            </label>
            <div class="row col-1">
              <label class="md-check" style="margin-right: 0px;">
                <input type="checkbox" id="contEndYmdNull" name="contEndYmdNull" checked="" disabled="">
                <i class="black"></i>미정</label>
            </div>
            <div class="row col-3">
              <div class="input-group date">
                <input type="text" class="form-control component_calendar" autocomplete="off" id="contEndYmd" name="contEndYmd" data-date-format="yyyy.MM.dd" data-expired="N" value="" baap-single-datepicker-custom="" required="required" disabled="">
                <button type="button" class="input-group-addon calendar btn btn-s white" id="component_calendar2" disabled="">
                  <i class="icon-lineIcon-calendar"><span class="blind">달력</span></i>
                </button>
                <div class="daterangepicker dropdown-menu ltr single opensright"><div class="time-line" style="display: none;"></div><div class="calendar left single" style="display: block;"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_start" value="" style="display: none;"><i class="fa fa-calendar glyphicon glyphicon-calendar" style="display: none;"></i><div class="calendar-time" style="display: none;"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="input-group-wrap" style="display: none;"><div class="input-group time"></div></div><div class="calendar-table"></div></div><div class="calendar right" style="display: none;"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_end" value="" style="display: none;"><i class="fa fa-calendar glyphicon glyphicon-calendar" style="display: none;"></i><div class="calendar-time" style="display: none;"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="input-group-wrap" style="display: none;"><div class="input-group time"></div></div><div class="calendar-table"></div></div><div class="ranges" style="display: none;"><div class="range_inputs"><button class="cancelBtn white btn btn-md mh-3" type="button"><i class="icon-lineIcon-close mr-5"></i>취소</button><button class="applyBtn black btn btn-md mh-3" disabled="disabled" type="button"><i class="icon-lineIcon-check mr-5"></i>적용</button> </div></div></div></div>
            </div>
          </div>
          <input type="hidden" name="usedPartTimePay" value="true">
          <div class="form-group row">
            <label class="form-label type2 col-2 HOURLY_WAGE">
              <span class="ess">시급<span class="blind">필수</span></span>
              <button type="button" class="btn btn-s flat solid ml-6 _modify_button" data-type="hourlyWage" data-target="input[name='hourlyWage']" data-msg="시급을 변경하시겠습니까?">
                <i class="icon-solidIcon-edit"><span class="blind">수정</span></i>
              </button>
            </label>
            <div class="row col-4">
              <div class="input-group type-divide disabled">
                <div class="divide-left" style="width:30%;">
                  <span class="input-group-addon title">KRW(₩)</span>
                </div>
                <div class="divide-right" style="width:70%;">
                  <input type="text" disabled="disabled" autocomplete="off" class="form-control" name="hourlyWage" inputmode="numeric" placeholder="" data-pre-title="주휴수당을 제외한 시급을 입력하세요." data-original-title="" data-toggle="tooltip" data-placement="bottom_left" required="required" value="8720">
                </div>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label type2 col-2 DAY_WORK_TIME">
              <span class="ess">일일 근로 시간<span class="blind">필수</span></span>
              <button type="button" class="btn btn-s flat solid ml-6 _modify_button" data-type="dayWorkTime" data-target="input[name='dayWorkTime']" data-msg="일일 근로 시간을 변경하시겠습니까?">
                <i class="icon-solidIcon-edit"><span class="blind">수정</span></i>
              </button>
            </label>
            <div class="row col-4">
              <div class="input-group">
                <input type="text" disabled="disabled" autocomplete="off" class="form-control" name="dayWorkTime" placeholder="" required="required" value="8">
              </div>
            </div>
            <div class="col-2">
              <div class="input-group">
                <span class="input-text mt-5">시간</span>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label type2 col-2 WEEK_HOLI_CD">
              <span>주휴일</span>
              <button type="button" class="btn btn-s flat solid ml-6 _modify_button" data-type="weekHoliCd" data-target="button[name='button']" data-msg="주휴일을 변경하시겠습니까?">
                <i class="icon-solidIcon-edit"><span class="blind">수정</span></i>
              </button>
            </label>
            <div class="row col-6">
              <div class="input-group dropdown scroll" uikit="dropdown"><input type="hidden" name="weekHoliCd" value="1" id="weekHoliCd"><button type="button" name="button" class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false" title="일요일" disabled="disabled">일요일<i class="icon-lineIcon-line-arrow-down"></i></button><div class="dropdown-menu dropdown-menu-scale"><div class="ndk-scrollbar"><a class="dropdown-item selected" href="#" onclick="return false" value="1">일요일</a>
                <a class="dropdown-item" href="#" onclick="return false" value="2">월요일</a>
                <a class="dropdown-item" href="#" onclick="return false" value="3">화요일</a>
                <a class="dropdown-item" href="#" onclick="return false" value="4">수요일</a>
                <a class="dropdown-item" href="#" onclick="return false" value="5">목요일</a>
                <a class="dropdown-item" href="#" onclick="return false" value="6">금요일</a>
                <a class="dropdown-item" href="#" onclick="return false" value="7">토요일</a>
              </div></div></div>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label type2 col-2 WORK_DAYS_CD">
              <span class="ess">근무 요일<span class="blind">필수</span></span>
              <button type="button" class="btn btn-s flat solid ml-6 _modify_button" data-type="workDaysCd" data-target="input[name='workDaysCd']" data-msg="근무 요일을 변경하시겠습니까?">
                <i class="icon-solidIcon-edit"><span class="blind">수정</span></i>
              </button>
            </label>
            <div class="row col-6">
              <div class="input-group">
                <label class="md-check">
                  <input type="checkbox" name="workDaysCd" value="1" disabled="disabled">
                  <i class="black"></i>일</label>
                <label class="md-check">
                  <input type="checkbox" name="workDaysCd" value="2" disabled="disabled" checked="checked">
                  <i class="black"></i>월</label>
                <label class="md-check">
                  <input type="checkbox" name="workDaysCd" value="3" disabled="disabled" checked="checked">
                  <i class="black"></i>화</label>
                <label class="md-check">
                  <input type="checkbox" name="workDaysCd" value="4" disabled="disabled" checked="checked">
                  <i class="black"></i>수</label>
                <label class="md-check">
                  <input type="checkbox" name="workDaysCd" value="5" disabled="disabled" checked="checked">
                  <i class="black"></i>목</label>
                <label class="md-check">
                  <input type="checkbox" name="workDaysCd" value="6" disabled="disabled" checked="checked">
                  <i class="black"></i>금</label>
                <label class="md-check">
                  <input type="checkbox" name="workDaysCd" value="7" disabled="disabled">
                  <i class="black"></i>토</label>
              </div>
            </div>
          </div>

          <input type="hidden" name="contType" value="CONT">

          <input type="hidden" id="cont" value="국민연금<br>건강보험<br>고용보험<br>장기요양보험<br>소득세<br>지방세">
          <input type="hidden" id="day" value="고용보험">
          <input type="hidden" id="dayPlus" value="고용보험<br>근로소득세<br>지방세">
          <input type="hidden" id="short" value="없음">
          <input type="hidden" id="shortPlus" value="고용보험">
          <div class="form-group row">
            <label class="form-label type2 col-2 TAX_LIST">
              <span class="ess">세금 적용<span class="blind">필수</span></span>
            </label>
            <div class="row col-6">
              <div class="input-group">
                <input type="hidden" id="checkTaxList" value="true">
                <button class="btn btn-md line-1" style="display: none;" name="taxList" data-html="true" data-original-title="" data-toggle="tooltip" data-placement="bottom_left">공제 항목 확인</button>
                <button class="btn btn-md line-1" name="taxListCont" data-html="true" data-original-title="국민연금<br>건강보험<br>고용보험<br>장기요양보험<br>소득세<br>지방세" data-toggle="tooltip" data-placement="bottom_left">공제 항목 확인</button>
                <button class="btn btn-md line-1" style="display: none;" name="taxListDay" data-html="true" data-original-title="고용보험" data-toggle="tooltip" data-placement="bottom_left">공제 항목 확인</button>
                <button class="btn btn-md line-1" style="display: none;" name="taxListDayPlus" data-html="true" data-original-title="고용보험<br>근로소득세<br>지방세" data-toggle="tooltip" data-placement="bottom_left">공제 항목 확인</button>
                <button class="btn btn-md line-1" style="display: none;" name="taxListShort" data-html="true" data-original-title="없음" data-toggle="tooltip" data-placement="bottom_left">공제 항목 확인</button>
                <button class="btn btn-md line-1" style="display: none;" name="taxListShortPlus" data-html="true" data-original-title="고용보험" data-toggle="tooltip" data-placement="bottom_left">공제 항목 확인</button>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label type2 col-2 MONTH_AVG_AMT">
              <span class="ess">월 평균 보수<span class="blind">필수</span></span>
              <button type="button" class="btn btn-s flat solid ml-6 _modify_button" data-type="monthAvgAmt" data-target="input[name='monthAvgAmt']" data-msg="월 평균 보수를 변경하시겠습니까?">
                <i class="icon-solidIcon-edit"><span class="blind">수정</span></i>
              </button>
            </label>
            <div class="row col-4">
              <div class="input-group type-divide disabled">
                <div class="divide-left" style="width:30%;">
                  <span class="input-group-addon title">KRW(₩)</span>
                </div>
                <div class="divide-right" style="width:70%;">
                  <input type="text" disabled="disabled" autocomplete="off" class="form-control" name="monthAvgAmt" inputmode="numeric" placeholder="" required="required" value="0">
                </div>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="form-label type2 col-2 FUNCTION">
              <span>직무</span>
            </label>
            <div class="row col-6">
              <div class="input-group">
                <input type="text" autocomplete="off" class="form-control" name="function" value="">
              </div>
            </div>
          </div>
          <div id="atchFileWrap" class="form-group row">
            <label class="form-label col-2 pl-15">
              <span class="text-222">파일 첨부</span>
              <button type="button" class="btn btn-s flat solid ml-6 _modify_button" data-type="atchFile" data-target="#showModeAtchFile" data-target2="#saveModeAtchFile" data-msg="">
                <i class="icon-solidIcon-edit"><span class="blind">수정</span></i>
              </button>
            </label>
            <div class="row col-6" id="showModeAtchFile">
              <div class="form-group row">
              </div>
            </div>
            <div class="row col-6" id="saveModeAtchFile" style="display:none">
              <div class="input-group">
                <label for="atchFile" class="btn btn-md line-1"><i class="icon-lineIcon-upload mr-5"></i>파일 첨부</label>
                <input id="atchFile" name="atchBtn" type="file" class="hide" accept="pdf,doc,docx,ppt,xls,xlsx,jpg,png,jpeg,gif" data-file-size-mb="10" data-file-count="10" multiple="">
              </div>
              <div name="atchDrag" class="form-group row">
                <div class="col-12 pt-13 pl-0 pr-0">
                  <div mscroll="atchFile" class="box type3">
                    <div name="atchList" class="box-body dropzone dz-message dz-clickable ndk-scrollbar"><div class="file-txt text-center"><i class="icon-lineIcon-upload mr-10"></i>마우스로 파일을 끌어오세요.</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="form-bottom">
        <button type="button" class="btn btn-lg flat" id="cancelButton"><i class="icon-lineIcon-close mr-5"></i>취소</button>
        <button type="button" class="btn btn-lg ml-5" id="printButton" data-toggle="modal" data-target="64f2aa10-089b-4e89-999a-464f15cc4962"><i class="icon-lineIcon-document mr-5"></i>인쇄</button>
        <button type="button" class="btn btn-lg black ml-5" id="saveButton"><i class="icon-lineIcon-check mr-5"></i>저장</button>
      </div>
    </div>
  </div>
</template>

