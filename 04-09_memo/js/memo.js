

"use strict";

window.addEventListener("DOMContentLoaded",
    function () {
        if (typeof localStorage === "undefined") {
            window.alert("このプラウザはLocal Storage機能が実装されていません");
            return;
        } else {
            viewStorage();
            savelocalStorage();
            delLocalStorage();
            allClearLocalStorage();
            selectTable();
        }
    }
);
function savelocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;

            if (key == "" || value == "") {
                Swal.fire({
                    title: "Memo app" //タイトルをここに設定
                    , html: "Key、Memoはいずれも必須です。" //メッセージ内容をここに設定
                    , type: "error" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                    , allowOutsideClick: false //枠外クリックは許可しない
                });
                return;
            } else {
                let w_msg = "LocalStorageに\n「" + key + " " + value + "」\nを保存(save)しますか?";
                Swal.fire({
                    title: "Memo app" //タイトルをここに設定
                    , html: w_msg //メッセージ内容をここに設定
                    , type: "question" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                    , showCancelButton: true // キャンセルボタンの表示
                }).then(function (result) {
                    //確認(かくにん)ダイアログで「OK」を押されたとき、保存(ほぞん)する
                    if (result.value === true) {
                        localStorage.setItem(key, value);
                        viewStorage(); //localStorageからのデータの取得(しゅとく)とテーブルへ表示(ひょうじ) let w_msg = "LocalStorageに" + key + " " + value + "を保存(ほぞん)しました。";
                        let w_msg = "LocalStorageに" + key + " " + value + "を保存(save)しました。";
                        Swal.fire({
                            title: "Memo app" //タイトルをここに設定
                            , html: w_msg //メッセージ内容をここに設定
                            , type: "success" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                            , allowOutsideClick: false //枠外クリックは許可しない
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });
            }

        }, false
    );
};
//3.local Storage から1削除
function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            const chkbox1 = document.getElementsByName("chkbox1");
            const table1 = document.getElementById("table1");
            let w_cnt = "0";  //選択
            w_cnt = selectCheckBox("del");

            if (w_cnt >= 1) {
                // const key = document.getElementById("textKey").value;
                //const value = document.getElementById("textMemo").value;
                let w_msg = "LocalStorageから選択されている" + w_cnt + "件を削除(delete)しますか?";
                //確認　ダイアログで「OK」　を押されたとき、削除する//version-up add
                Swal.fire({
                    title: "Memo app" //タイトルをここに設定
                    , html: w_msg //メッセージ内容をここに設定
                    , type: "question" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                    , showCancelButton: true // キャンセルボタンの表示
                }).then(function (result) {
                    //確認(かくにん)ダイアログで「OK」を押されたとき、削除(さくじょ)する
                    if (result.value) {
                        for (let i = 0; i < chkbox1.length; i++) {
                            if (chkbox1[i].checked) {
                                localStorage.removeItem(table1.rows[i + 1].cells[1].firstChild.data);
                            }
                        }
                        viewStorage(); //localStorageからのデータの取得(しゅとく)とテーブルへ表示(ひょうじ) let w_msg = "LocalStorageから" + w_cnt + "件を削除(delete)しました。";
                        let w_msg = "LocalStorageから" + w_cnt + "件を削除(delete)しました。";
                        Swal.fire({
                            title: "Memo app" //タイトルをここに設定
                            , html: w_msg //メッセージ内容をここに設定
                            , type: "success" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                            , allowOutsideClick: false //枠外クリックは許可しない
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });
            }
        }, false
    );
};
//4.localstorageからすべて削除
function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_msg = "localStorageのデータをすべて削除(all clear)します。 \nよろしいですか?";
            //確認ok press it will all clear
            Swal.fire({
                title: "Memo app" //タイトルをここに設定
                , html: w_msg //メッセージ内容をここに設定
                , type: "question" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                , showCancelButton: true // キャンセルボタンの表示
            }).then(function (result) {
                if (result.value) {
                    localStorage.clear();
                    viewStorage(); //localStorageからのデータの取得(しゅとく)とテーブルへ表示(ひょうじ) let w_msg = "LocalStorageのデータをすべて削除(all clear)しました。";
                    // window.alert(w_msg);
                    let w_msg = "localStorageのデータをすべて削除(all clear)しました。";
                    Swal.fire({
                        title: "Memo app" //タイトルをここに設定
                        , html: w_msg //メッセージ内容をここに設定
                        , type: "success" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                        , allowOutsideClick: false //枠外クリックは許可しない
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });

        }, false
    );
};

//5.データ選択
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function (e) {
            e.preventDefault;
            selectCheckBox("select"); //テーブルからデータ選択
        }, false
    );
};

function selectCheckBox(mode) {
    // let w_sel = "0";
    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey = "";
    let w_textMemo = "";

    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            if (w_cnt === 0) {
                w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
                // return w_sel = "1";
            }
            w_cnt++;
        }
    }
    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;
    if (mode === "select") {
        if (w_cnt === 1) {
            return w_cnt;
        }
        else {
            Swal.fire({
                title: "Memo app" //タイトルをここに設定
                , html: "1つ選択(select)してください。" //メッセージ内容をここに設定
                , type: "error" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                , allowOutsideClick: false //枠外クリックは許可しない
            });
        }
    }

    if (mode === "del") {
        if (w_cnt >= 1) {
            return w_cnt;
        } else {
            Swal.fire({
                title: "Memo app" //タイトルをここに設定
                , html: "1つ以上選択(select)してください。" //メッセージ内容をここに設定
                , type: "error" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                , allowOutsideClick: false //枠外クリックは許可しない
            });
        }
    }
};

//localStorage
function viewStorage() {
    const list = document.getElementById("list");
    //htmlのdata
    while (list.rows[0]) list.deleteRow(0);

    //localStorage
    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);

        //localstorage
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }
    //jQuery のplugin tablesorter を使ってテーブルのシート
    //sortList
    $("#table1").tablesorter({    //tablesort  add
        sortList: [[1, 0]]         //tablesort  add
    });                                //tablesort  add

    $("#table1").trigger("update");   //tablesort  add
}