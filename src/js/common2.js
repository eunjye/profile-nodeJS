/** 화면 정보 */
var pageInfo = { id: '', title: '', prev: false, menu: true };

$(function() {
    // page initial
    pageInitial();

    // 페이지 타이틀 - publishing에서만 사용됨
    setTitle();

    // 2020.07.07 - PC quick menu
    if (!!!isMobileChk) {
        pcQuickMenu();
    }

    // 모바일 화면에서 화면 하단 버튼 있을 때
    // if (isMobileChk) {
    //     if ($('.main-wrap').find('.btn-wrap-fixed').length > 0) {
    //         $('.main-wrap').addClass('fixed-bottom');
    //     }
    // }
    setBtnFixed();

    // input box
    inputClear();

    // textarea auto height
    inpTextarea();

    // scroll top button
    // 2020.07.07 삭제
    // dispBtnTop();

    // toast popup
    uiToast.run();

    // tooltip 함수 호출 추가 - 2020.04.21
    toolTip();
});

/** mobile check */
var isMobileChk
    , isModalLoading = false; // [20200707/jh] 모달이 로딩중인지 체크
function chkMobile() {
    var userAgent = navigator.userAgent;
    var mobile = new Array('Android', 'iPhone', 'iPod', 'iPad', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson');
    for (var info in mobile) {
        if (userAgent.match(mobile[info]) !== null) {
            return true;
        }
    }

    return false;
}
isMobileChk = chkMobile();
console.log('isMobileChk = ', isMobileChk);

/** page initial */
function pageInitial() {
    // 공통 document title
    var titleObj = $('title');
    titleObj.html('미래에셋생명');

    // 공통 meta tag
    var addTag = '';
        addTag += '<meta name="apple-mobile-web-app-capable" content="yes">';
        addTag += '<meta name="apple-mobile-web-app-status-bar-style" content="black">';
        addTag += '<meta name="mobile-web-app-capable" content="yes"></meta>';
        addTag += '<link rel="shortcut icon" href="../../images/home/favicon3.ico">';

    $('meta[name=viewport]').after(addTag);

    // plugins script 추가
    var scrt = '';
    scrt += '<script type="text/javascript" src="../../js/home/lib/ui.global.js"></script>';
    scrt += '<script type="text/javascript" src="../../js/home/lib/plugins.ui.accordion.js"></script>';
    scrt += '<script type="text/javascript" src="../../js/home/lib/plugins.ui.datepicker.js"></script>';
    scrt += '<script type="text/javascript" src="../../js/home/lib/plugins.ui.floating.js"></script>';
    scrt += '<script type="text/javascript" src="../../js/home/lib/plugins.ui.loading.js"></script>';
    scrt += '<script type="text/javascript" src="../../js/home/lib/plugins.ui.modal.js?version=1"></script>';
    scrt += '<script type="text/javascript" src="../../js/home/lib/plugins.ui.select.js"></script>';
    scrt += '<script type="text/javascript" src="../../js/home/lib/plugins.ui.slick.min.js"></script>';
    scrt += '<script type="text/javascript" src="../../js/home/lib/plugins.ui.slider.js"></script>';
    scrt += '<script type="text/javascript" src="../../js/home/lib/plugins.ui.tab.js"></script>';
    scrt += '<script type="text/javascript" src="../../js/home/lib/plugins.ui.tooltip.js"></script>';
    // 2020.07.27 년/월 선택 script 추가
    scrt += '<script type="text/javascript" src="../../js/home/lib/plugins.ui.yearmonth.js"></script>';
    scrt += '<script type="text/javascript" src="../../js/home/lib/jquery.scrollbar.min.js"></script>';
    $('head').append(scrt);
}

// 공통 화면 제목 - 2020.05.27 menu 버튼 및 닫기 버튼 수정
function setTitle() {
    // 2020.06.12 추가 - 모바일일 때 완료화면에서 header 삭제
    // 2020.06.18 수정 - 닫기 버튼만 있을 때의 조건 추가
    if (isMobileChk && !!!pageInfo.prev && !!!pageInfo.menu && !!!pageInfo.close) {
        if ($('.complete-wrap').length > 0) {
            $('.gnb').remove();
            // 2020.06.17 추가 - 완료화면에서 상단 padding 미적용
            $('.main-wrap').addClass('pdt-n');
        }
    }

    // [20200916/jh] step 초기화
    if (isMobileChk) {
        $('.stepBar').remove();
    }

    // 2020-05-18 div.gnb-wrap 추가
    var actTitle = '<div class="gnb-wrap">';
        // 2020.09.02 웹접근성 대응 a 태그로 수정
        // 2020.09.18 웹접근성 :: h1태그와 a 태그의 위치 수정 및 span 태그 추가
        actTitle += '<h1><a href="javascript:;" class="logo"><span>행복한 은퇴설계의 시작 - 미래에셋생명</span></a></h1>';

    if (isMobileChk) {
        actTitle += pageInfo.title ? '<h1 class="tit">'+pageInfo.title+'</h1>' : '';
        actTitle += pageInfo.prev ? '<button type="button" class="lnb-prev"><span>이전</span></button>' : '';
        
        !!$('.gnb .item-more').length ? $('.gnb .item-more').remove() : ''; // [20200831/jh] .item-more 체크 후 초기화
    } else {
        if ($('.title-wrap').length > 0) {
            $('.title-wrap').eq(0).prepend('<h1 class="pageTit">'+pageInfo.title+'</h1>');
        } else {
            // 2020.06.10 수정/추가 - .title-wrap 없을 때 추가시키기
            // 2020.08.04 온라인보험 청약 화면일 때 조건 추가
            if (pageInfo.title !== '' && typeof pageInfo.title !== 'undefined' && $('.wrap').hasClass('join') !== true) {
                var pageTitle = $('<div class="title-wrap"><h1 class="pageTit">'+pageInfo.title+'</h1></div>');
                if ($('.main-visual').length < 1 && $('.tab-cont').length < 1) {
                    $('.main-page').eq(0).prepend(pageTitle);
                }

                // 2020.06.17 추가 - tab 내용이 load 방식이 아닐 때
                if ($('.tab-wrap').find('.tab-cont').length > 0) {
                    console.log('test');
                    $('.main-page').eq(0).prepend(pageTitle);
                }
                
                // 2020.06.11 수정 - .main-page 체크에 대한 조건 수정
                if ($('.main-wrap > .main-page').length < 1) {
                    $('.main-wrap').eq(0).prepend(pageTitle);
                }
                // 2020.06.12 추가 - 생명 홈페이지에서 타이틀 삭제
                if ($('.main-wrap').length > 0) {                     
                    if ($('.main-wrap').attr('class').indexOf('life') > -1) {
                        $('.main-wrap > .title-wrap').remove();
                    }
                }
            }
        }
    }

    actTitle += '<div class="gnb-menu"></div>';
    // 2020.09.02 웹접근성 관련 a 태그 title 속성 추가
    actTitle += (pageInfo.menu || typeof pageInfo.menu === 'undefined') ? '<a href="javascript:;" class="lnb-open" tabindex="0"><i><span>전체메뉴 열기</span></i><span>MENU</span></a>' : '';
    actTitle += pageInfo.close ? '<button type="button" class="btn-close"><span>닫기</span></button>' : '';
    
    actTitle += '</div>';

    $('.gnb').append(actTitle);
}

// 2020.07.07 추가 - PC Quick menu
function pcQuickMenu() {
    var body = $('body');
    var quickObj = $('<div class="quick-menu"></div>');
    // 2020.08.24 온라인보험 청약 단계에서 quick menu 추가 X
    pageInfo.footer !== 'join' ? body.append(quickObj) : '';

    $('.quick-menu').load('/html/home/quickmenu.html');
}

// input box
function inputClear() {
    var clearObj = $('.inp-clear');
    var clearBtn = $('<button type="button" class="inp-del"><span>삭제</span></button>');
    if (!!!clearObj[type="passwword"] && clearObj.prop('readonly') === false) {
        clearObj.on('focus input', function() {
            var thisVal = $(this).val();
            if (thisVal) {
                if ($(this).siblings('.btn-srch').length) {
                    $(this).after(clearBtn);
                } else {
                    clearBtn.appendTo($(this).closest('.input-item'));
                }
            }

            clearBtn.on('click', function() {
                if ($(this).closest('.main-page').find('.btn-next').length > 0) {
                    $(this).closest('.main-page').find('.btn-next').removeClass('active');
                }
                if ($(this).closest('.type-step').children('.btn-wrap-fixed').find('.btn-base').length > 0) {
                    $(this).closest('.type-step').children('.btn-wrap-fixed').find('.btn-base').prop({disabled: true});
                }
                var thisInp = $(this).siblings('.inp-clear');
                thisInp.val('').focus();
                $(this).remove();
            });
        });
    }
}

// textarea 내용에 따라 높이 자동 조절
function inpTextarea() {
    var txtarea = $('.txtarea');

    $.each(txtarea, function(i) {
        var valLen, txtareaH,
            limit = parseInt(txtarea.eq(i).attr('maxlength'));
        var validateObj = $('<span class="error">최대 <i></i>자 까지만 입력 가능합니다.</span>');
        var limitTxt = $('<span class="limit-num">0/'+limit+'자</span>');

        if (txtarea.eq(i).attr('maxLength')) {
            txtarea.eq(i).after(limitTxt);
        }

        txtarea.eq(i).on('keyup', function() {
            valLen = $(this).val().length;
            // txtareaH = ($(this).closest('.input-item').attr('class').indexOf('type-line') > -1) ? 52 : 52;
            txtareaH = 52;

            $(this).css({height: txtareaH +'px'});
            $(this).css({height: $(this).prop('scrollHeight')});
            if ($(this).prop('scrollHeight') > 200) {
                $(this).css({overflowY: 'auto'});
            } else {
                $(this).css({overflowY: 'hidden'});
            }

            // maxlength값이 있을 때
            if (limit) {
                $(this).next('.limit-num').html(valLen+'/'+limit+'자');
                if (limit < valLen) {
                    validateObj.find('i').html(limit);
                    validateObj.appendTo($(this).closest('.input-wrap'));
                } else {
                    $(this).closest('.input-wrap').find('.error').remove();
                }
            }
        });
    });
}

// modal open 시 뒤화면 스크롤 막기
var pageTop;
function stopScroll() {
    if (!!!isMobileChk) {
        pageTop = $(window).scrollTop();
        $('body').css({ position:'fixed', top: -1*pageTop, width: '100%' });
    }
}

// modal close 시 뒤화면 스크롤 허용
function allowScroll() {
    // $('body').removeAttr('style');
    // [20200825/jh] 모달 닫을 때 스크롤 풀기 (임시추가)
    if (!!!isMobileChk) {
        $('html').css('overflow', 'auto'); // [20200911/jh] 뒷화면 스크롤 이슈
        $('body').css({ position: '', top: '', width: '', overflow:'auto' });
    } else {
        $('body').css({ position: '', top: '', width: '' });
    }
    window.scrollTo(0, pageTop);
}

// scroll top button
function dispBtnTop() {
    var winH, docH;
    var _body = $('body');
    var btnTop = $('<div class="goTop"><button type="button" class="btn-top"><span>Top</span></button></div>');

    setTimeout(function() {
        winH = $(window).innerHeight();
        docH = $('body').innerHeight();

        if (winH < docH) {
            btnTop.appendTo(_body);
        }
    }, 300);

    $(window).on('scroll', function(e) {
        var pTop = $(this).scrollTop();
        if (pTop >= 300) {
            btnTop.addClass('show');
        } else {
            btnTop.removeClass('show');
        }
    });

    btnTop.on('mousedown click', function() {
        $('html, body').animate({scrollTop: '0'}, 200);
        $(this).blur();
    });
}

// 모바일에서 하단 버튼 있을 때
function setBtnFixed() {
    var btnWrap = $('.btn-wrap-fixed');
    var btnWrapH;
    
    if (isMobileChk && $('.main-wrap').attr('class').indexOf('type-step') < 0) {
        if (btnWrap.length < 1) return false;
        
        $.each(btnWrap, function(i) {
            // var btnWrapChild = $('.floating-wrap').length > 1
            //     ? btnWrap.eq(i).find('.floating-wrap').children()
            //     : btnWrap.eq(i).children();
            // var btnWrapChild = btnWrap.eq(i).children();
            
            // 2020.06.30 수정
            var btnWrapChild = btnWrap.eq(i).children().hasClass('floating-wrap') === false
                ? btnWrapChild = btnWrap.eq(i).children()
                : btnWrapChild = btnWrap.eq(i).find('.floating-wrap').children();

            var floatWrap = $('<div class="floating-wrap"></div>');

            btnWrap.eq(i).addClass('floating').html(floatWrap);
            btnWrap.eq(i).find('.floating-wrap').append(btnWrapChild);

            if (btnWrap.eq(i).attr('class').indexOf('middle') > 0) {
                if ($('.tab-wrap').length > 0) {
                    btnWrap.eq(i).closest('.tab-cont').append(btnWrap.eq(i));
                } else {
                    btnWrap.eq(i).appendTo('.main-wrap');
                }
            }

            // tab이 있을 때
            if ($('.tab-wrap').length > 1) {
                $('.btn-tab').on('click', function() {
                    btnWrap.eq(i-1).remove();
                });
            }

            // 2020.06.16 수정
            // btnWrapH = $('.ui-floating').length > 0
            //     ? $('.tab-inner').outerHeight() + floatWrap.outerHeight() + 5
            //     : floatWrap.outerHeight();
            // [20200821/jh] btnWrap 여러개 있을 시 height 개별 지정
            var timer = setTimeout(function() {
                btnWrapH = btnWrap.eq(i).find(floatWrap).outerHeight();
                btnWrap.eq(i).css({ height: btnWrapH + 'px' });
                clearTimeout(timer);
            }, 300); 

            // [20200618/jh] 내부에 absolute 컨텐츠 있을 때 mgt 추가
            var mgt = 0
                , _flag = false
                , $btnWrapEl = $(btnWrapChild).children();
            $.each($btnWrapEl, function(_idx, item){
                if ($(item).css('position') === 'absolute'){
                    _flag = true;
                    mgt += $(item).outerHeight() + parseInt($(item).css('marginBottom'));
                }
            })
            if (_flag) btnWrap.css('marginTop', mgt+20+'px');
        });

        // 2020.09.08 loading 후 1초 뒤 내려감, scroll 시 올라감
        // console.log($('.main-wrap').outerHeight());

        // clearTimeout(timer);
        // var timer = setTimeout(function() {
        //     btnWrap.addClass('down');
        // }, 1000);

        // $('html, body').on('scroll mousewheel touchmove', function() {
        //     btnWrap.removeClass('down');
            
        //     if ($(this).scrollTop() < 10) {
        //         btnWrap.addClass('down');
        //     }
        // });
    }

    // mobile에서 modal내 tab일 때
    if (isMobileChk) {
        if (btnWrap.closest('.ui-modal').length > 0) {
            var btnClone = $('.tab-cont').find('.btn-wrap-fixed').clone();
            var btnH = btnWrap.outerHeight();
            $('.ui-modal-wrap').append(btnClone);
            $('.ui-modal-wrap .tab-cont').css({ paddingBottom: btnH });
            $('.tab-cont').find('.btn-wrap-fixed').remove();

            $('.btn-tab').on('click', function() {
                $('.ui-modal-wrap > .btn-wrap-fixed').remove();
            });
        }
    }
}
function setBtnFixed2() { // [20200917/jh] 버튼 fixed 동작 안할 때
    var btnWrap = $('.btn-wrap-fixed');
    var btnWrapH;
    
    if (isMobileChk && $('.main-wrap').attr('class').indexOf('type-step') < 0) {
        if (btnWrap.length < 1) return false;
        
        $.each(btnWrap, function(i) {
            var btnWrapChild = btnWrap.eq(i).children().hasClass('floating-wrap') === false
                ? btnWrapChild = btnWrap.eq(i).children()
                : btnWrapChild = btnWrap.eq(i).find('.floating-wrap').children();

            // var floatWrap = $('<div class="floating-wrap"></div>');

            btnWrap.eq(i).addClass('floating')
            !btnWrap.eq(i).find('.floating-wrap').length ? btnWrap.eq(i).wrapInner('<div class="floating-wrap"></div>') : '';

            if (btnWrap.eq(i).attr('class').indexOf('middle') > 0) {
                if ($('.tab-wrap').length > 0) {
                    btnWrap.eq(i).closest('.tab-cont').append(btnWrap.eq(i));
                } else {
                    btnWrap.eq(i).appendTo('.main-wrap');
                }
            }

            // tab이 있을 때
            if ($('.tab-wrap').length > 1) {
                $('.btn-tab').on('click', function() {
                    btnWrap.eq(i-1).remove();
                });
            }

            // [20200821/jh] btnWrap 여러개 있을 시 height 개별 지정
            var timer = setTimeout(function() {
                btnWrapH = btnWrap.eq(i).find('.floating-wrap').outerHeight();
                btnWrap.eq(i).css({ height: btnWrapH + 'px' });
                clearTimeout(timer);
            }, 300); 

            // [20200618/jh] 내부에 absolute 컨텐츠 있을 때 mgt 추가
            var mgt = 0
                , _flag = false
                , $btnWrapEl = $(btnWrapChild).children();
            $.each($btnWrapEl, function(_idx, item){
                if ($(item).css('position') === 'absolute'){
                    _flag = true;
                    mgt += $(item).outerHeight() + parseInt($(item).css('marginBottom'));
                }
            })
            if (_flag) btnWrap.css('marginTop', mgt+20+'px');
        });
    }

    // mobile에서 modal내 tab일 때
    if (isMobileChk) {
        if (btnWrap.closest('.ui-modal').length > 0) {
            var btnClone = $('.tab-cont').find('.btn-wrap-fixed').clone();
            var btnH = btnWrap.outerHeight();
            $('.ui-modal-wrap').append(btnClone);
            $('.ui-modal-wrap .tab-cont').css({ paddingBottom: btnH });
            $('.tab-cont').find('.btn-wrap-fixed').remove();

            $('.btn-tab').on('click', function() {
                $('.ui-modal-wrap > .btn-wrap-fixed').remove();
            });
        }
    }
}

// toast popup
var uiToast = {
    opt : {
        type: 'default',
        target: false,  // $(target) : 필수 
        body: false,  // $(target)
        delay: 1400,  // number
        message: [''], // array
        callback: function(){} // callback
    },
    activeToast: [],
    timer: [],
    toggleToast: function(opt){
        var _opt = opt === undefined ? {} : opt
            , _opt = $.extend(true, {}, uiToast.opt, opt)
            , $ts = _opt.target 
            , alertType = _opt.type
            , $toast = $('.ui-toast.'+alertType)
            , $body = !_opt.body ? $('body') : _opt.body
            , delay = _opt.delay
            , msg = _opt.message
            , callback = _opt.callback;

        // 메세지 토글 여부
        if (msg.length > 1) {
            msg = !$ts.hasClass('on') ? msg[0] : msg[1];
            $ts.toggleClass('on');
            !$ts.find('.only-sr').length ? $ts.append('<span class="only-sr">선택됨</span>') : ''; // [20200904/jh] 접근성 관련 문구 추가
        }
    
        // 활성화 토스트 배열에 넣음
        var _idx = uiToast.activeToast.indexOf(alertType);
        if (_idx === -1) {
            _idx = uiToast.activeToast.length < 1 ? 0 : uiToast.activeToast.length;
            uiToast.activeToast.push(alertType);
        }

        // 이미 같은 타입의 toast가 없을 때
        if (!$body.find('.ui-toast.' + alertType).length){
            var _html = '<div class="ui-toast '+alertType+'"><span>'+msg+'</span></div>';
            $body.append(_html);
            $toast = $('.ui-toast.'+alertType);
            setTimeout(function () {
                $toast.addClass('on');
            }, 10);
        } else { // 있을 때
            $toast.removeClass('on');
            setTimeout(function () {
                $toast.addClass('on').text(msg);
            }, 100);
        }
        clearTimeout(uiToast.timer[_idx]);

        uiToast.timer[_idx] = setTimeout(function () {
            uiToast.hideToast(alertType);
            callback(); // [20200720/jh] callback 추가
        }, delay);
    },
    hideToast: function(alertType) {
        $('.ui-toast.'+alertType).removeClass('on');
        setTimeout(function () {
            $('.ui-toast.'+alertType).remove();
            if (!$('.ui-toast').length) {
                uiToast.activeToast = [];
            }
        }, 200);
    },
    run: function(){
        // $(document).off('click.uiToastFavorite').on('click.uiToastFavorite', '.ui-toast-btn.btn-favorite', function(){
        //     uiToast.toggleToast({
        //         type: 'favorite-fund',
        //         target: $(this),
        //         message: [
        //             '관심펀드로 저장되었습니다.', 
        //             '관심펀드가 해제되였습니다.'
        //         ]
        //     });
        // });
        // $(document).off('click.uiToastDelete').on('click.uiToastDelete', '.ui-toast-btn.btn-delete', function(){
        //     uiToast.toggleToast({
        //         target: $(this),
        //         message: [
        //             '펀드가 삭제되었습니다.'
        //         ]
        //     });
        // });
    },
}

/* Modal Open
----------------------- */
var modalUI = {
    pages: [],
    setPages: function(arr, add) {
        var isInPage = !!$('.ui-modal').length || !!$('.tab-wrap').length;
        if ((isInPage && !!modalUI.pages.length) || add) { // 엮여있는 페이지고, pages 배열이 존재한다면
            arr.forEach(function(item){
                var n = 0
                    , _flag = false; // 배열에 이미 존재하는지 check
                while (n < modalUI.pages.length) {
                    if (item.page === modalUI.pages[n].page) {
                        _flag = true; // 이미 존재함
                        break;
                    } else n++;
                }
                !_flag ? modalUI.pages.push(item) : '';
            });
        } else { // 단독페이지거나, pages 배열이 없다면
            modalUI.pages = arr;
        };
        console.log(modalUI.pages); // (삭제예정) 확인용
    },
    run: function(v) {
        // var $btn = $(event.target);
        var targetPage = v
            , arrPages = modalUI.pages
            , _opt = {};

        var i = 0;
        while (i < arrPages.length) {
            if (targetPage === arrPages[i].page) {
                _opt = arrPages[i];
                break;
            } else i++;
        }

        var _id = _opt.id
            , _url = './' + _opt.page + '.html'
            , _width = _opt.size === 'large' ? 1040 : _opt.size === 'small' ? 560 : _opt.full ? '' : 800
            , _height = _opt.height 
            , _ps = _opt.ps
            // , _mpage = isMobileChk ? _opt.mpage : false
            , _mpage = _opt.mpage
            , _full = !!!isMobileChk ? _opt.full : false
            , _list = !!!isMobileChk ? _opt.list : false
            , _callback = _opt.callback
            , _closeback = _opt.closeback;


        // modal plugin
        if (isMobileChk) {
            $plugins.uiModal({
                id: _id,
                ps: _ps,
                mpage: _mpage,
                link: _url,
                callback: _callback,
                closeback: _closeback
            });
        } else {
            $plugins.uiModal({
                id: _id,
                ps: _ps,
                width: _width,
                height: _height,
                mpage: _mpage,
                full: _full,
                link: _url,
                list: _list,
                callback: _callback,
                closeback: _closeback
            });
            $('#'+_id).addClass(_opt.size === undefined ? _opt.full ? '' : 'medium' : _opt.size); // [20200723/jh] modal size 구분자 class 추가
        }
    }
};

// step
var displayStep = {
    setStep: function(v) {
        var _opt = v
            , target = !!!_opt.target ? 'main' : _opt.target
            , totStep = _opt.total
            , nowStep = _opt.now
            , modalId = !!_opt.id ? _opt.id : ''
            , targetObj = !!!modalId ? target === 'main' ? $('.main-wrap') : $('.tab-cont') : $('#'+modalId).find('.ui-modal-inner')
            , barW = parseInt(nowStep / totStep * 100)
            , progBar = $('<div class="stepBar"><div class="bar"></div></div>')
            , progStep = $('<div class="step-text"><span class="current"></span>/<span class="total"></span></div>')
            , circleWrap = $('<div class="process-wrap"></div>')
            , progCircle, nowClass, progNum, stepSel;

        // 초기화
        $('.stepBar').remove();
        $('.step-text').remove();
        $('.process-wrap').remove();

        if (isMobileChk) {
            if (target === 'main') {
                if (!!modalId) {
                    // progBar.appendTo('.gnb');
                    $('#'+modalId).find('.ui-modal-header').append(progBar);
                } else {
                    progBar.appendTo('.gnb');
                }
                
                targetObj.prepend(progStep);

                $('.stepBar').find('.bar').css({ width: barW+'%' });
                $('.step-text').find('.current').html(nowStep);
                $('.step-text').find('.total').html(totStep);
            } else if (target === 'tab') {
                progCircle = '';
                for (var i=0; i<totStep; i++) {
                    progNum = i + 1;
                    nowClass = nowStep === progNum ? 'class="now"' : '';
                    stepSel = nowStep === progNum ? 'true' : 'false';
                    progCircle += '<span '+nowClass+' aria-selected="'+stepSel+'" title="'+progNum+'단계">'+ progNum +'</span>';
                }
                circleWrap.html(progCircle);
                targetObj.prepend(circleWrap);
            }
        } else {
            progCircle = '';
            for (var i=0; i<totStep; i++) {
                progNum = i + 1;
                nowClass = nowStep === progNum ? 'class="now"' : '';
                stepSel = nowStep === progNum ? 'true' : 'false';
                progCircle += '<span '+nowClass+' aria-selected="'+stepSel+'" title="'+progNum+'단계">'+ progNum +'</span>';
            }
            circleWrap.html(progCircle);
            targetObj.prepend(circleWrap);

            // [20200918/jh] 접근성 : title에 단계 표시
            if (!!$('.wrap').hasClass('cyber-wrap')) {
                var titleTxt = $('head title').text()
                    , stepTxt = '(' + nowStep + '단계)';
                console.log($('head title').text().indexOf('('));
                if ($('head title').text().indexOf('(') === 0) { // 텍스트에 step 있을 시
                    var endIdx = titleTxt.indexOf(')');
                    titleTxt = titleTxt.substr(endIdx+1);
                } 
                $('head title').text(stepTxt + titleTxt);
            }
        }
    }
};

// 2020.07.20 메인 이벤트 팝업
function popEvent(opt) {
    /* 이벤트 관련 option
        1. cnt      : number, 이벤트 갯수
        2. infoUrl  : array[event1 url, event2 url], 이벤트 안내 url
        3. imgPC    : array[event1 img, event2 img], PC용 이벤트 이미지
        4. imgMO    : array[event1 img, event2 img], Mobile용 이벤트 이미지
        5. goImg    : array[pc, mo], 이벤트 응모 바로가기 버튼 이미지
        6. goUrl    : string, 이벤트 응모 바로가기 url
    */
    var evtCnt = opt.cnt,
        evtInfoUrl = opt.infoUrl,
        evtImg = !!!isMobileChk ? opt.imgPC : opt.imgMO,
        evtGoImg = opt.cnt < 2 ? !!!isMobileChk ? opt.goImg[0] : opt.goImg[1] : null,
        evtGoUrl = opt.cnt < 2 ? opt.goUrl : null,
        imgPath = '../../images/home/_dummy/';
    
    var evtLayer = $('<div id="eventLayer" class="event-layer"></div>').appendTo('body');
    var evtPop = '';
    for (var i=0; i<evtCnt; i++) {
        evtPop = '<div class="evtpop-wrap">';
        // 2020.09.21 닫기 버튼 추가
        !!!isMobileChk ? evtPop += '<button type="button" class="btn-close"><span>닫기</span></button>' : '';
        evtPop += '<div class="evtpop-cont">';
        evtPop += '<a href="'+evtInfoUrl[i]+'"><img src="'+imgPath+''+evtImg[i]+'"></a>';
        evtPop += '</div>';

        if (evtCnt < 2 && !!evtGoImg) {
            evtPop += '<div class="evtpop-footer">';
            evtPop += '<a href="'+evtGoUrl+'"><img src="'+imgPath+''+evtGoImg+'"></a>';
            evtPop += '</div>';
        }

        evtPop += '<div class="evtpop-close">';
        evtPop += '<div class="evtpop-close-item">';
        evtPop += '<a href="javascript:;" class="btn-stop">오늘 그만 보기</a>';
        evtPop += '</div>';
        evtPop += '<div class="evtpop-close-item">';
        evtPop += '<a href="javascript:;" class="btn-close">닫기</a>';
        evtPop += '</div>';
        evtPop += '</div>';
        evtPop += '</div>';

        evtLayer.append(evtPop);
    }

    // 2020.09.22 웹접근성 : focus 관련 추가
    $plugins.uiFocusTab({ selector: '#eventLayer' });

    var popCnt = evtCnt;
    evtLayer.addClass('view');
    if (popCnt === 2) {
        evtLayer.addClass('multi');
    }

    for (var i=0; i<evtCnt; i++) {
        evtLayer.find('.evtpop-wrap').eq(i).addClass('view');
    }

    stopScroll();

    // 이벤트 팝업 닫기
    var evtpopClose = {
        // 닫기
        close : function(obj) {
            obj.closest('.evtpop-wrap').removeClass('view');
            evtLayer.removeClass('multi');
            popCnt = popCnt - 1;
            if (popCnt === 0) {
                evtLayer.removeClass('view');
                allowScroll();
            }
        },

        // 오늘 그만 보기
        stop: function(obj) {
            evtpopClose.close(obj);
        }
    };

    // '닫기' 클릭
    // 2020.07.23 selector 수정
    evtLayer.find('.btn-close').on('click', function() {
        var $this = $(this);
        evtpopClose.close($this);
    });

    // '오늘 그만 보기' 클릭
    // 2020.07.23 selector 수정
    evtLayer.find('.btn-stop').on('click', function() {
        var $this = $(this);
        evtpopClose.stop($this);
    });
}

// 2020.07.23 주요 공지 팝업 추가
function majorPopup(opt) {
    var notiUrl = opt.notiUrl
        , notiImg = isMobileChk ? opt.notiImg[1] : opt.notiImg[0]
        , justGo = opt.justGo ? opt.justGo : null
        , goUrl = opt.goUrl ? opt.goUrl : null
        , goImg = isMobileChk ? opt.goImg[1] : opt.goImg[0]
        , imgPath = '../../images/home/_dummy/';

    var majorLayer = $('<div id="majorLayer" class="event-layer"></div>').appendTo('body');
    var majorPop = '<div class="evtpop-wrap view">';
        // 2020.09.21 닫기 버튼 추가
        !!!isMobileChk ? majorPop += '<button type="button" class="btn-close"><span>닫기</span></button>' : '';
        majorPop += '<div class="evtpop-cont">';
        majorPop += '<a href="'+notiUrl+'"><img src="'+imgPath+''+notiImg+'"></a>';
        majorPop += '</div>';

        if (justGo) {
            majorPop += '<div class="evtpop-footer">';
            majorPop += '<a href="'+goUrl+'"><img src="'+imgPath+''+goImg+'"></a>';
            majorPop += '</div>';
        }

        majorPop += '<div class="evtpop-close">';
        majorPop += '<div class="evtpop-close-item">';
        majorPop += '<a href="javascript:;" class="btn-stop">오늘 그만 보기</a>';
        majorPop += '</div>';
        majorPop += '<div class="evtpop-close-item">';
        majorPop += '<a href="javascript:;" class="btn-close">닫기</a>';
        majorPop += '</div>';
        majorPop += '</div>';
        majorPop += '</div>';

    majorLayer.append(majorPop).addClass('view');

    // 2020.09.22 웹접근성 : focus 관련 추가
    $plugins.uiFocusTab({ selector: '#majorLayer' });

    stopScroll();

    // 이벤트 팝업 닫기
    var popClose = {
        // 닫기
        close : function(obj) {
            obj.closest('.evtpop-wrap').removeClass('view');
            majorLayer.removeClass('view');
            console.log($('.event-layer').length);
            $('.event-layer').length < 2 ? allowScroll() : null;
        },

        // 오늘 그만 보기
        stop: function(obj) {
            popClose.close(obj);
        }
    };

    // '닫기' 클릭
    majorLayer.find('.btn-close').on('click', function() {
        var $this = $(this);
        popClose.close($this);
    });

    // '오늘 그만 보기' 클릭
    majorLayer.find('.btn-stop').on('click', function() {
        var $this = $(this);
        popClose.stop($this);
    });
}

// 2020.06.18 추가 - gauge형 그래프
/*
var gaugeGraph = {
    draw: function(opt) {
        var id = opt.id
            , gaugeWrap = $('#'+id)
            , gauge = $('<canvas id="'+id+'_canvas"></canvas>')
            , nowData = opt.nowData
            , recomData = opt.recomData
            , dataRange = Math.round(nowData/recomData*10)/10
            , dataPer = dataRange * 100
            , stateTxt
            , strokeWidth = !!!opt.strokeWidth ? 14 : opt.strokeWidth
            , bgColor = !!!opt.bgColor ? '#f0f0f0' : opt.bgColor
            , gaugeColor = !!!opt.gaugeColor ? '#ff6600' : opt.gaugeColor
            , endAngle = -1 * dataRange * Math.PI
            , speedRate = !!!opt.speedRate ? 50 : opt.speedRate;
        
        // 상태 관련 텍스트
        if (dataPer >= 0 && dataPer < 30) {
            stateTxt = '미비';
        } else if (dataPer >= 30 && dataPer < 70) {
            stateTxt = '부족';
        } else if (dataPer >= 70 && dataPer < 100 ) {
            stateTxt = '보통';
        } else if (dataPer >= 100) {
            stateTxt = '충분';
        }

        // 숫자를 한글로 표시
        function changeToKr(num) {
            var inputNumber  = num < 0 ? false : num;
            var unitWords    = ['만', '억', '조', '경'];
            var splitUnit    = 10000;
            var splitCount   = unitWords.length;
            var resultArray  = [];
            var resultString = '';

            for (var i = 0; i < splitCount; i++){
                var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
                unitResult = Math.floor(unitResult);
                if (unitResult > 0){
                    resultArray[i] = unitResult;
                }
            }

            for (var i = 0; i < resultArray.length; i++){
                if(!resultArray[i]) continue;
                resultString = String(resultArray[i]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + unitWords[i] + resultString;
            }

            return resultString;
        }

        // canvas 추가
        gaugeWrap.append(gauge);

        // 가입금액/상태, 권장금액 표시
        var stateObj = '<div class="nowData">';
            stateObj += '<strong>' + changeToKr(nowData)+'원</strong>';
            stateObj += stateTxt;
            stateObj += '</div>';
            stateObj += '<div class="recomData">';
            stateObj += changeToKr(recomData)+'원';
            stateObj += '<strong>권장</strong>';
            stateObj += '</div>';

        gaugeWrap.append(stateObj);

        // canvas
        var chartW = gaugeWrap.outerWidth()
            , chartH = gaugeWrap.outerHeight()
            , canvas = document.getElementById(id+'_canvas')
            , posX = parseInt(chartW/2)
            , posY = parseInt(chartW/2)
            , radius = parseInt((chartW - 40)/2);

        canvas.width = chartW;
        canvas.height = chartH;
        var context = canvas.getContext('2d');

        // background gauge
        function gaugeBase() {
            context.lineWidth = strokeWidth;
            context.strokeStyle = bgColor;
            context.beginPath();
            context.arc(posX, posY, radius, Math.PI, 0, false);
            context.stroke();
        }

        // data gauge
        function gaugeData(rate) {
            var loadingRate = rate/speedRate;
            var eAngle = Math.PI - endAngle*loadingRate;
            
            context.lineWidth = strokeWidth;
            context.strokeStyle = gaugeColor;
            context.beginPath();
            context.arc(posX, posY, radius, Math.PI, eAngle, false);
            context.stroke();
        }

        // gauge draw
        function drawGauge(rate) {
            context.clearRect(0, 0, chartW, chartH);
            gaugeBase();
            gaugeData(rate);
        }

        // gauge animate
        var rate = 0;
        function aniGauge() {
            var rateInterval = setInterval(function() {
                if (rate <= speedRate) {
                    drawGauge(rate);
                    rate++;

                    if (rate === speedRate) {
                        clearInterval(rateInterval);
                    }
                }
            }, 20);
        }

        aniGauge();
    }
}; */

// 가로/세로 모드 체크
// function chkLandscape() {
//     var orientType = screen.orientation.type;
//     if (orientType === 'landscape-primary') {
//         return true;
//     } else if (orientType === 'portrait-primary') {
//         return false;
//     }
// }

// 가로 모드 금지
// $(window).on('orientationchange', function() {
//     var landInfo = $('<div class="landInfo">가로모드는 지원하지 않습니다.</div>');
//     if (isMobileChk) {
//         if (chkLandscape()) {
//             landInfo.appendTo('body');
//         } else {
//             $('.landInfo').remove();
//         }
//     }
// });