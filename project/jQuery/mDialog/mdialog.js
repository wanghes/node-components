/*!
 * mDialog v1.3.1
 * Copyright 2013-2014 Frans.Lee, http://www.ifrans.cn
 * v1.3.1 2014-04-23 #修复一处自定义class相关的问题
 * v1.3 2014-04-01 #优化弹窗内容过多时的上下滑动体验
 * v1.2 2014-03-18 #修复一处问题，兼容android 2.3.x
 * v1.1 2014-02-19 #阻止touchmove事件
 */
;(function () {
    var mDialogTpl = '<div class="ui-dialog-inner">' +
        '<div class="ui-dialog-header">' +
        '<h2 class="ui-dialog-title"></h2>' +
        '<a href="javascript:;" class="ui-dialog-btn ui-dialog-close-btn"></a>' +
        '</div>' +
        '<div class="ui-dialog-cont-wrapper">' +
        '<div class="ui-dialog-content"></div>' +
        '</div>' +
        '<div class="ui-dialog-btn-wrapper"></div>' +
        '</div>';

    var mDialog = function (content, option) {
        option = option || {};
        var config = mDialog.config;
        var cancelBtnHide = (option.cancelBtn && !option.cancelBtn.hide)?false:true;
        //配置项合并
        for (var o in config) {
            option[o] = option[o] === undefined ? config[o] : option[o];
            if (Object.prototype.toString.call(config[o]).toLowerCase() == '[object object]') {
                for (var s in config[o]) {
                    option[o][s] = option[o][s] === undefined ? config[o][s] : option[o][s];
                }
            }
        }
        option.cancelBtn.hide = cancelBtnHide;
        mDialog.config.zIndex = option.zIndex;
        return new mDialog.prototype.init(content, option);
    };

    mDialog.prototype = {
        constructor: mDialog,
        init: function (content, option) {
            if (!content) return;

            var DOM, newDom = true, that = this;

            if (that.elems('.ui-dialog')) {
                var i = 0, len = that.elems('.ui-dialog').length;
                while (i < len) {
                    if (that.elems('.ui-dialog')[i].style.display == 'none') {
                        DOM = that.elems('.ui-dialog')[i];
                        newDom = false;
                        break;
                    }
                    i++;
                }
            }

            this.DOM = DOM = DOM || document.createElement('div');

            DOM.innerHTML = mDialogTpl;
            DOM.className = 'ui-dialog ' + (option.mask ? 'ui-dialog-mask ' : '') + option.addClass;
            that.domElem('.ui-dialog-title').innerText = option.title;
            that.domElem('.ui-dialog-content').innerHTML = content;
            DOM.style.zIndex = mDialog.config.zIndex++;
            DOM.id = option.id;

            that.createBtn(option);

            if (newDom) {
                DOM.addEventListener('touchmove', function (e) {
                    e.target.className!='ui-dialog-content' && e.preventDefault();
                });
                document.body.appendChild(DOM);
            } else {
                DOM.style.display = '';
            }

            return this;
        },
        domElem: function (selector) {
            return this.DOM.querySelector(selector);
        },
        elems: function (selector) {
            return document.querySelectorAll(selector);
        },
        close: function (DOM) {
            (DOM || this.DOM).style.display = 'none';
            return false;
        },
        createBtn: function (option) {
            var that = this, DOM = this.DOM, btnCode = '';
            that.domElem('.ui-dialog-close-btn').style.display = option.closeBtn.hide ? 'none' : '';

            if (!option.okBtn.hide) {
                btnCode += '<a href="javascript:;" class="ui-dialog-btn btn-a ok-btn">' + option.okBtn.text + '</a>';
            }

            if (!option.cancelBtn.hide) {
                btnCode += '<a href="javascript:;" class="ui-dialog-btn btn-b cancel-btn">' + option.cancelBtn.text + '</a>';
            }

            that.domElem('.ui-dialog-btn-wrapper').innerHTML = btnCode;

            if (that.domElem('.ok-btn')) {
                that.domElem('.ok-btn').addEventListener('click', function () {
                    if (option.okBtn.callback && option.okBtn.callback.call(that) == false) return;
                    that.close()
                }, false);
            }

            if (that.domElem('.cancel-btn')) {
                that.domElem('.cancel-btn').addEventListener('click', function () {
                    if (option.cancelBtn.callback && option.cancelBtn.callback.call(that) == false) return;
                    that.close();
                }, false);
            }

            if (that.domElem('.ui-dialog-close-btn')) {
                that.domElem('.ui-dialog-close-btn').addEventListener('click', function () {
                    if (option.closeBtn.callback && option.closeBtn.callback.call(that) == false) return;
                    that.close();
                }, false);
            }

        }

    };

    mDialog.close = function (DOM) {
        if (!DOM) return;
        mDialog().close(DOM);
    };
    //默认配置
    mDialog.config = {
        title: '提示信息',
        mask: true,
        id: '',
        addClass: '',
        zIndex: 9900,
        okBtn: {
            hide: false,
            text: '确定',
            callback: null
        },
        cancelBtn: {
            hide: false,
            text: '取消',
            callback: null
        },
        closeBtn: {
            hide: false,
            callback: null
        }
    };

    mDialog.prototype.init.prototype = mDialog.prototype;
    window.mDialog = mDialog;
})(window, undefined)