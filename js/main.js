// ページのすべての要素が読み込まれてから実行する
document.addEventListener('DOMContentLoaded', () => {

    // --- suguni.html のタブ機能 ---
    const tabs = document.querySelectorAll('.tab-item');
    const panels = document.querySelectorAll('.tab-panel');

    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(item => item.classList.remove('is-active'));
                tab.classList.add('is-active');

                panels.forEach(panel => panel.classList.remove('is-active'));
                const targetPanel = document.getElementById(tab.dataset.tab);
                if(targetPanel) {
                    targetPanel.classList.add('is-active');
                }
            });
        });
    }

    // --- yoin.html のコメント投稿機能 ---
    const commentForm = document.getElementById('comment-form');
    const commentList = document.getElementById('comment-list');
    const videoBefore = document.getElementById('video-before');
    const videoAfter = document.getElementById('video-after');

    if (commentForm) {
        commentForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const nickname = document.getElementById('nickname-input').value;
            const message = document.getElementById('message-input').value;

            if (nickname.trim() === '' || message.trim() === '') {
                alert('ニックネームとメッセージを入力してください。');
                return;
            }

            if (videoBefore && videoAfter) {
                videoBefore.classList.remove('is-active');
                videoAfter.classList.add('is-active');
            }

            const newComment = document.createElement('div');
            newComment.classList.add('comment-item');
            newComment.innerHTML = `
                <p class="comment-item__nickname comment-item__nickname--special">${nickname}</p>
                <p class="comment-item__text">${message}</p>
            `;

            commentList.prepend(newComment);
            commentForm.reset();
        });
    }

    // --- suguni.html の開閉機能 ---
    const routeTrigger = document.getElementById('route-trigger');
    
    if (routeTrigger) {
        const routeContainer = routeTrigger.closest('.collapsible');
        routeTrigger.addEventListener('click', () => {
            routeContainer.classList.toggle('is-open');
        });
    }


    // --- yoin.html のポップアップ（モーダル）機能 ---
    const yoinPageContent = document.getElementById('yoin-page-content');

    if (yoinPageContent) {
        const locationModal = document.getElementById('location-modal');
        const guidanceModal = document.getElementById('guidance-modal');
        const checkinModal = document.getElementById('checkin-modal');
        const locationDenyBtn = document.getElementById('location-deny');
        const locationAllowBtn = document.getElementById('location-allow');
        const guidanceImage = document.getElementById('guidance-image'); // 画像を取得
        const checkinBtn = document.getElementById('checkin-button');

        const showPageContent = () => {
            locationModal.classList.add('is-hidden');
            guidanceModal.classList.add('is-hidden');
            checkinModal.classList.add('is-hidden');
            yoinPageContent.classList.remove('is-blurred');
        };

        // ページ読み込み時に最初のモーダルを表示
        locationModal.classList.remove('is-hidden');
        yoinPageContent.classList.add('is-blurred');
        
        // 位置情報「いいえ」が押されたら
        locationDenyBtn.addEventListener('click', showPageContent);

        // 位置情報「はい」が押されたら
        locationAllowBtn.addEventListener('click', () => {
            locationModal.classList.add('is-hidden');
            
            // 【ご要望通り】必ずエリア外として処理します
            // テスト用にエリア内の表示を確認したい場合は、下の行を true に変更してください
            const isInArea = false; 
            
            if (isInArea) {
                checkinModal.classList.remove('is-hidden');
            } else {
                guidanceModal.classList.remove('is-hidden');
            }
        });

        // 【ここを修正】エリア外誘導モーダルの「画像」をクリックしたら
        if (guidanceImage) {
            guidanceImage.addEventListener('click', () => {
                guidanceModal.classList.add('is-hidden');
                checkinModal.classList.remove('is-hidden');
            });
        }

        // チェックインボタンが押されたら
        checkinBtn.addEventListener('click', showPageContent);
    }
});