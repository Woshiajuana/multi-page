
import Store from '../../../assets/lib/store'

$(function () {

    let arr = [
        {
            id: '1',
            title: '1111111111',
            author: '啊哈',
            duration: 200,
            file: '../media/880211.mp3',
            src: 'http://www.owulia.com/static/temp/1.jpg',
        },
        {
            id: '2',
            title: '2222222222',
            author: '啊哈',
            duration: 200,
            file: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3',
            src: 'http://www.owulia.com/static/temp/2.jpg',
        },
        {
            id: '3',
            title: '33333333',
            author: '啊哈',
            duration: 200,
            file: '../media/880211.mp3',
            src: 'http://www.owulia.com/static/temp/3.jpg',
        },
        {
            id: '4',
            title: '44444444',
            author: '啊哈',
            duration: 200,
            file: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3',
            src: 'http://www.owulia.com/static/temp/4.jpg',
        },
        {
            id: '5',
            title: '5555555555',
            author: '啊哈',
            duration: 200,
            file: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3',
            src: 'http://www.owulia.com/static/temp/4.jpg',
        },
        {
            id: '6',
            title: '666666666666',
            author: '啊哈',
            duration: 200,
            file: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3',
            src: 'http://www.owulia.com/static/temp/4.jpg',
        },
        {
            id: '7',
            title: '777777777777',
            author: '啊哈',
            duration: 200,
            file: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3',
            src: 'http://www.owulia.com/static/temp/4.jpg',
        },
        {
            id: '8',
            title: '8888888888',
            author: '啊哈',
            duration: 200,
            file: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3',
            src: 'http://www.owulia.com/static/temp/4.jpg',
        },
        {
            id: '9',
            title: '99999999999',
            author: '啊哈',
            duration: 200,
            file: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3',
            src: 'http://www.owulia.com/static/temp/4.jpg',
        },
        {
            id: '0',
            title: '00000000000',
            author: '啊哈',
            duration: 200,
            file: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3',
            src: 'http://www.owulia.com/static/temp/4.jpg',
        },
    ];

    const MusicResourcesController = {
        key: 'MUSIC_LIST',
        $el: $('#list'),
        el: 'li',
        total: [],
        list: [],
        href: '/dist/view/player',
        init (total, list) {
            this.total = total;
            this.getList(list);
            this.addMonitorEvent();
        },
        // 歌曲事件监听
        addMonitorEvent () {
            let that = this;
            // 选取播放歌曲
            this.$el.on('click', this.el, function (e) {
                let index = $(this).data('index');
                let music = that.total[index];
                music && that.addMusic(music);
            });
            return this;
        },
        getList(list) {
            this.list = list || Store.dataToLocalStorageOperate.achieve(this.key) || [];
            return this.list;
        },
        addMusic(music) {
            let index = this.findMusic(music);
            if(!index){
                this.list.push(music);
                this.saveList();
                window.location.href = window.location.origin + this.href;
            }
            return this;
        },
        saveList(list) {
            if(list) this.list = list;
            Store.dataToLocalStorageOperate.save(this.key, this.list);
        },
        findMusic (music) {
            let cur_index = Store.findFirstIndexForArr(this.list, (item, index) => {
                return (item.id === music.id);
            });
            return cur_index === -1 ? null : cur_index;
        },
        removeMusic(music) {
            let index = this.findMusic(music);
            index && this.list.splice(index, 1);
            this.saveList();
            return this;
        },
    };
    MusicResourcesController.init(arr);
}());
