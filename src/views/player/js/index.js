// import { formatData } from 'wow-cool/lib/date.lib'
import Store from '../../../assets/lib/store'

$(function () {

    // 音乐资源控制器
    const MusicResourcesController = {
        key: 'MUSIC_LIST',
        list: null,
        init () {
            this.getList();
            return this;
        },
        remove(index) {
            this.list.splice(index, 1);
            Store.dataToLocalStorageOperate.save(this.key, this.list);
        },
        getList () {
            this.list = Store.dataToLocalStorageOperate.achieve(this.key) || [];
            return this.list;
        },
    };
    let arr = MusicResourcesController.init().getList();

    // 音乐列表控制器
    const MusicListController = {
        $el: $('#music-wrap'),
        $el_list: $('#music-list'),
        $el_all: $('#check-all'),
        $el_title: $('#music-title'),
        $el_src: $('#music-pic-image'),
        list: [],
        // 初始化
        init (list, index) {
            this.innerHTML(list, index);
            this.addMonitorEvent();
            return this;
        },
        innerHTML(list, index) {
            let str = '';
            this.list = list || [];
            list.forEach((item, i) => {
                str += `<li class="list-item ${i === index ? 'active' : ''}" data-index="${i}">
                            <div class="list-item-part check">
                                <div class="check-box">
                                    <div class="check-inner"></div>
                                </div>
                                <span class="check-box-prompt icon">播</span>
                                <span class="check-box-prompt index">${i + 1}</span>
                            </div>
                            <div class="list-item-part name">${item.title}</div>
                            <div class="list-item-part author">${item.author}</div>
                            <div class="list-item-part time">${formatTime(+item.duration)}</div>
                        </li>`;
            });
            this.$el_list.html(str);
            return this;
        },
        // 歌曲事件监听
        addMonitorEvent () {
            let that = this;
            // 选取播放歌曲
            this.$el.on('click', '.list-item', function (e) {
                let index = $(this).data('index');
                MusicPlayerController.play(index);
                that.handleSwitchItem(index);
            }).on('click', '.check-box', function (e) {
                that.channelCheckHandle($(this));
                e.stopPropagation();
            }).on('click', '#check-all', function (e) {
                that.channelAllHandle($(this));
            });
            return this;
        },
        // 切换选中歌曲
        handleSwitchItem (i) {
            $('.list-item').each(function (index, item) {
                if (i === index) {
                    $(item).addClass('active')
                } else {
                    $(item).removeClass('active')
                }
            });
            let music = this.list[i];
            this.$el_title.text(music.title);
            this.$el_src.prop('src', music.src);
            return this;
        },
        // 选中全部
        channelAllHandle (el) {
            let type = this.channelCheckHandle(el);
            if (type) {
                $('#music-list .check-box').addClass('active')
            } else {
                $('#music-list .check-box').removeClass('active')
            }
        },
        // 切换
        channelCheckHandle (el) {
            let type = el.hasClass('active');
            if (!type) {
                el.addClass('active');
            } else {
                el.removeClass('active');
            }
            return !type;
        }
    };
    MusicListController.init(arr, 0);

    // 音乐播放控制器
    const MusicPlayerController = {
        $el: $('#player-warp'),
        $el_player: $('#player'),
        $el_play: $('#play-ctr'),
        $el_title: $('.play-music-title'),
        list: null,
        init (list, index = 0) {
            this.list = list;
            this.index = index;
            let that = this;
            $('#player').jPlayer({
                ready: function () {
                    that.play(that.index)
                },
                error: function () {
                    that.handleNext('next');
                },
                supplied: 'mp3',
                wmode: 'window',
            });
            this.addMonitorEvent();
            return this;
        },
        setList(list) {
            this.list = list;
            return this;
        },
        getCurIndex () {
            return this.index;
        },
        play (index) {
            this.index = index;
            let music = this.list[this.index];
            if (music) {
                $('#player').jPlayer('setMedia', {
                    mp3: music.file,
                }).jPlayer('play');
                this.$el_title.text(music.title);
                MusicListController.handleSwitchItem(index);
                this.$el_play.addClass('play').removeClass('pause');
            }
            return this;
        },
        addMonitorEvent() {
            let that = this;
            this.$el.on('click', '#play-ctr', function (e) {
                that.handlePlayOrPause($(this));
            }).on('click', '.play-bar-inner', function (e) {
                let progress = that.handleProgress(this, e);
                $('#player').jPlayer('play', that.list[that.index].duration * progress);
            }).on('click', '.play-volume-inner', function (e) {
                let progress = that.handleProgress(this, e);
                $('#player').jPlayer('volume', progress);
            }).on('click', '.up', function (e) {
                that.handleNext();
            }).on('click', '.down', function (e) {
                that.handleNext('next');
            });
            this.$el_player.bind($.jPlayer.event.ended, (e) => {
                that.handleNext('next');
            });
            this.$el_player.bind($.jPlayer.event.timeupdate, (e) => {
                that.handlePlaying(e);
            });
            return this;
        },
        // timeupdate
        handlePlaying(e) {
            let progress = e.jPlayer.status.currentPercentAbsolute;
            let volume = e.jPlayer.options.volume * 100;
            $('.play-volume-con').css({width: volume + '%'});
            $('.play-volume-ctr').css({left: volume + '%'});
            $('.play-bar-con').css({width: progress + '%'});
            $('.play-bar-ctr').css({left: progress + '%'});
            let time = Math.round(e.jPlayer.status.currentTime);
            this.list[this.index].duration = Math.round(e.jPlayer.status.duration);
            let music_time = formatTime(time) + '/' + formatTime(this.list[this.index].duration);
            $('.play-music-time').text(music_time);
        },
        // 下一首 上一首
        handleNext(type) {
            let next_index = null;
            let len = this.list.length;
            if (type === 'next') {
                next_index = (this.index + 1) % len;
            } else {
                next_index = (this.index - 1 + len) % len;
            }
            this.play(next_index);
        },
        // 暂停
        handlePlayOrPause(el) {
            if (el.hasClass('play')){
                el.removeClass('play').addClass('pause');
                this.$el_player.jPlayer('pause');
            } else {
                el.removeClass('pause').addClass('play');
                this.$el_player.jPlayer('play');
            }
        },
        // 进度
        handleProgress(el, e,) {
            return (e.clientX - el.getBoundingClientRect().left) / el.clientWidth;
        }
    };
    MusicPlayerController.init(arr);



    // let duration = null;
    // $('#player').jPlayer({
    //     ready: function () {
    //         $(this).jPlayer('setMedia', {
    //             mp3: arr[0].file,
    //         }).jPlayer('play');
    //     },
    //     // swfPath: "../../dist/jplayer",
    //     supplied: 'mp3',
    //     wmode: 'window',
    //     // useStateClassSkin: true,
    //     // autoBlur: false,
    //     // smoothPlayBar: true,
    //     // keyEnabled: true,
    //     // remainingDuration: true,
    //     // toggleDuration: true
    // });
    //
    // $('#player').bind($.jPlayer.event.timeupdate, (e) => {
    //     let progress = e.jPlayer.status.currentPercentAbsolute;
    //     let volume = e.jPlayer.options.volume * 100;
    //     $('.play-volume-con').css({width: volume + '%'});
    //     $('.play-volume-ctr').css({left: volume + '%'});
    //     $('.play-bar-con').css({width: progress + '%'});
    //     $('.play-bar-ctr').css({left: progress + '%'});
    //     let time = Math.round(e.jPlayer.status.currentTime);
    //     duration = Math.round(e.jPlayer.status.duration);
    //     let music_time = formatTime(time) + '/' + formatTime(duration);
    //     $('.play-music-time').text(music_time);
    // });
    //
    // $('#play-ctr').on('click', function () {
    //     if ($(this).hasClass('play')){
    //         $(this).removeClass('play').addClass('pause');
    //         $('#player').jPlayer('pause');
    //     } else {
    //         $(this).removeClass('pause').addClass('play');
    //         $('#player').jPlayer('play');
    //     }
    // });
    //
    // $('.play-bar-inner').on('click', function (e) {
    //     let progress = (e.clientX - this
    //             .getBoundingClientRect().left) / this.clientWidth;
    //     $('#player').jPlayer('play', duration * progress);
    // });
    //
    // $('.play-volume-inner').on('click', function (e) {
    //     let progress = (e.clientX - this
    //             .getBoundingClientRect().left) / this.clientWidth;
    //     $('#player').jPlayer('volume', progress);
    // });

} ());


// 格式化时间

function formatTime (time) {
    let ss = time % 60;
    let mm = Math.floor(time / 60);
    if (mm < 10) mm = '0' + mm;
    if (ss < 10) ss = '0' + ss;
    time = mm + ':' + ss;
    return time;
}

