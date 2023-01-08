package com.example.dodara

import android.os.Bundle
import android.util.Log
import android.webkit.WebView
import androidx.appcompat.app.AppCompatActivity
import com.example.dodara.databinding.ActivityMainBinding
import com.google.android.gms.ads.*
import com.google.android.gms.ads.interstitial.InterstitialAd
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback


class MainActivity : AppCompatActivity() {
    private val TAG = "MainActivity"

    private val SETTINGS_FILE = "com.example.dodara.PREFERENCE_FILE_KEY"

    private var interstitialAd: InterstitialAd? = null

    private lateinit var webview: WebView

    private lateinit var bridge: Bridge;

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        supportActionBar?.hide();

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        MobileAds.initialize(
            this
        ) { }
        // Load the InterstitialAd and set the adUnitId (defined in values/strings.xml).
        loadInterstitialAd()

        WebView.setWebContentsDebuggingEnabled(true);

        webview = binding.webview
        webview.settings.allowFileAccess = true
        webview.settings.allowContentAccess = true
        webview.settings.javaScriptEnabled = true;

        bridge = Bridge(webview,
            { this.handleUiLoadedSuccessfully() },
            { id ->  this.handleSaveId(id) },
            { this.handlePrepareExercise() },
        );

        webview.addJavascriptInterface(bridge,"bridge")

        webview.loadUrl("file:///android_asset/www/index.html");
    }

    private fun loadInterstitialAd() {
        val adRequest = AdRequest.Builder().build()
        InterstitialAd.load(this, getString(R.string.interstitial_ad_unit_id), adRequest,
            object : InterstitialAdLoadCallback() {
                override fun onAdLoaded(ad: InterstitialAd) {
                    interstitialAd = ad
                    ad.setFullScreenContentCallback(
                        object : FullScreenContentCallback() {
                            override fun onAdDismissedFullScreenContent() {
                                interstitialAd = null
                                bridge.requestExercise()
                            }

                            override fun onAdFailedToShowFullScreenContent(adError: AdError) {
                                interstitialAd = null;
                                bridge.setHasNetwork(false);
                            }

                            override fun onAdShowedFullScreenContent() {
                            }
                        })
                }

                override fun onAdFailedToLoad(loadAdError: LoadAdError) {
                    interstitialAd = null;
                    bridge.setHasNetwork(false);
                }
            })
    }

    private fun handleUiLoadedSuccessfully() {
        runOnUiThread {
            val id = this.getId();
            if (id != null) {
                bridge.sendId(id)
            }

            bridge.sendIsInitialised();
        }
    }

    private fun getId(): String? {
        val settings = getSharedPreferences(SETTINGS_FILE, MODE_PRIVATE);
        return settings.getString("id", null);
    }

    private fun handleSaveId(id: String) {
        runOnUiThread {
            val settings = getSharedPreferences(SETTINGS_FILE, MODE_PRIVATE);
            val editor = settings.edit();
            editor.putString("id", id);
            editor.commit();
        }
    }

    private fun handlePrepareExercise() {
        runOnUiThread {
            if (interstitialAd == null) {
                loadInterstitialAd()
                bridge.requestExercise();
            } else {
                interstitialAd!!.show(this)
            }
        }
    }
}