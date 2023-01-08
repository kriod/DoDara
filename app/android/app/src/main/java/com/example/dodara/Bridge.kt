package com.example.dodara

import android.webkit.JavascriptInterface
import android.webkit.WebView

class Bridge(
    val webview: WebView,
    val handleUiLoadedSuccessfully: () -> Unit,
    val handleSaveId: (id: String) -> Unit,
    val handlePrepareExercise: () -> Unit,
) {

    @JavascriptInterface
    fun uiLoadedSuccessfully() {
        this.handleUiLoadedSuccessfully();
    }

    @JavascriptInterface
    fun prepareExercise(){
       this.handlePrepareExercise();
    }

    @JavascriptInterface
    fun saveId(id: String) {
        this.handleSaveId(id);
    }

    fun sendIsInitialised() {
        val toSend = "javascript:" + "window.receivedIsInitialised()";
        this.webview.evaluateJavascript(toSend,null);
    }

    fun sendId(id: String) {
        val toSend = "javascript:" + "window.receivedId('" +  id + "')";
        this.webview.evaluateJavascript(toSend,null);
    }

    fun requestExercise() {
        val toSend = "javascript:" + "window.requestExercise()";
        this.webview.evaluateJavascript(toSend,null);
    }

    fun setHasNetwork(isOnline: Boolean) {
        val toSend = "javascript:" + "window.setHasNetwork(" + isOnline + ")";
        this.webview.evaluateJavascript(toSend,null);
    }
}