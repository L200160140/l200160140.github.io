const isiData = [
    {
        id: 1,
        step: "1. Buat project baru, tambahkan line ini di gradle App",
        code: "implementation 'com.android.volley:volley:1.1.1'"
    },

    {
        id: 2,
        step: "2. Tambahkan internet permisssion pada Android Manifest",
        code: `
        &lt;manifest xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;<br />
        package=&quot;com.example.volleygithub&quot;&gt;<br />
    <br />
        &lt;uses-permission android:name=&quot;android.permission.INTERNET&quot; /&gt;<br />
    <br />
        &lt;application<br />
            android:allowBackup=&quot;true&quot;<br />
            android:icon=&quot;@mipmap/ic_launcher&quot;<br />
            android:label=&quot;@string/app_name&quot;<br />
            android:roundIcon=&quot;@mipmap/ic_launcher_round&quot;<br />
            android:supportsRtl=&quot;true&quot;<br />
            android:theme=&quot;@style/AppTheme&quot;&gt;<br />
    <br />
            &lt;activity android:name=&quot;.MainActivity&quot; &gt;<br />
                &lt;intent-filter&gt;<br />
                    &lt;action android:name=&quot;android.intent.action.MAIN&quot; /&gt;<br />
    <br />
                    &lt;category android:name=&quot;android.intent.category.LAUNCHER&quot; /&gt;<br />
                &lt;/intent-filter&gt;<br />
            &lt;/activity&gt;<br />
    <br />
        &lt;/application&gt;<br />
    &lt;/manifest&gt;                   `
    },

    {
        id: 3,
        step: "3. buat file .java baru dengan nama AppSingleton, isi dengan :",
        code: `
        <pre style='text-align: left; border: 1px dashed #008DEF; line-height: 18px; padding: 15px; font-size: 13px; font-family:'Courier New', Courier, monospace; overflow: auto;'><span style='font-weight:bold;color:#7B0052;'>import</span> android.content.Context;
<span style='font-weight:bold;color:#7B0052;'>import</span> android.graphics.Bitmap;
<span style='font-weight:bold;color:#7B0052;'>import</span> android.util.LruCache;

<span style='font-weight:bold;color:#7B0052;'>import</span> com.android.volley.Request;
<span style='font-weight:bold;color:#7B0052;'>import</span> com.android.volley.RequestQueue;
<span style='font-weight:bold;color:#7B0052;'>import</span> com.android.volley.toolbox.ImageLoader;
<span style='font-weight:bold;color:#7B0052;'>import</span> com.android.volley.toolbox.Volley;

<span style='color:#3F5FBF'>/**
 * Created by androidtutorialpoint on 5/11/16.
 */</span>
<span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>class</span> AppSingleton <span style='font-weight:bold;color:#D3171B'>{</span>
    <span style='font-weight:bold;color:#7B0052;'>private</span> <span style='font-weight:bold;color:#7B0052;'>static</span> AppSingleton mAppSingletonInstance;
    <span style='font-weight:bold;color:#7B0052;'>private</span> RequestQueue mRequestQueue;
    <span style='font-weight:bold;color:#7B0052;'>private</span> ImageLoader mImageLoader;
    <span style='font-weight:bold;color:#7B0052;'>private</span> <span style='font-weight:bold;color:#7B0052;'>static</span> Context mContext;

    <span style='font-weight:bold;color:#7B0052;'>private</span> AppSingleton(Context context) <span style='font-weight:bold;color:#D3171B'>{</span>
        mContext = context;
        mRequestQueue = getRequestQueue();

        mImageLoader = <span style='font-weight:bold;color:#7B0052;'>new</span> ImageLoader(mRequestQueue,
                <span style='font-weight:bold;color:#7B0052;'>new</span> ImageLoader.ImageCache() <span style='font-weight:bold;color:#D3171B'>{</span>
                    <span style='font-weight:bold;color:#7B0052;'>private</span> <span style='font-weight:bold;color:#7B0052;'>final</span> LruCache&lt;String, Bitmap&gt;
                            cache = <span style='font-weight:bold;color:#7B0052;'>new</span> LruCache&lt;String, Bitmap&gt;(20);

                    @Override
                    <span style='font-weight:bold;color:#7B0052;'>public</span> Bitmap getBitmap(String url) <span style='font-weight:bold;color:#D3171B'>{</span>
                        <span style='font-weight:bold;color:#7B0052;'>return</span> cache.get(url);
                    <span style='font-weight:bold;color:#D3171B'>}</span>

                    @Override
                    <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> putBitmap(String url, Bitmap bitmap) <span style='font-weight:bold;color:#D3171B'>{</span>
                        cache.put(url, bitmap);
                    <span style='font-weight:bold;color:#D3171B'>}</span>
                <span style='font-weight:bold;color:#D3171B'>}</span>);
    <span style='font-weight:bold;color:#D3171B'>}</span>

    <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>static</span> <span style='font-weight:bold;color:#7B0052;'>synchronized</span> AppSingleton getInstance(Context context) <span style='font-weight:bold;color:#D3171B'>{</span>
        <span style='font-weight:bold;color:#7B0052;'>if</span> (mAppSingletonInstance == <span style='font-weight:bold;color:#7B0052;'>null</span>) <span style='font-weight:bold;color:#D3171B'>{</span>
            mAppSingletonInstance = <span style='font-weight:bold;color:#7B0052;'>new</span> AppSingleton(context);
        <span style='font-weight:bold;color:#D3171B'>}</span>
        <span style='font-weight:bold;color:#7B0052;'>return</span> mAppSingletonInstance;
    <span style='font-weight:bold;color:#D3171B'>}</span>

    <span style='font-weight:bold;color:#7B0052;'>public</span> RequestQueue getRequestQueue() <span style='font-weight:bold;color:#D3171B'>{</span>
        <span style='font-weight:bold;color:#7B0052;'>if</span> (mRequestQueue == <span style='font-weight:bold;color:#7B0052;'>null</span>) <span style='font-weight:bold;color:#D3171B'>{</span>
            <span style='color:#3F7F5F'>// getApplicationContext() is key, it keeps you from leaking the
</span>            <span style='color:#3F7F5F'>// Activity or BroadcastReceiver if someone passes one in.
</span>            mRequestQueue = Volley.newRequestQueue(mContext.getApplicationContext());
        <span style='font-weight:bold;color:#D3171B'>}</span>
        <span style='font-weight:bold;color:#7B0052;'>return</span> mRequestQueue;
    <span style='font-weight:bold;color:#D3171B'>}</span>

    <span style='font-weight:bold;color:#7B0052;'>public</span> &lt;T&gt; <span style='font-weight:bold;color:#7B0052;'>void</span> addToRequestQueue(Request&lt;T&gt; req,String tag) <span style='font-weight:bold;color:#D3171B'>{</span>
        req.setTag(tag);
        getRequestQueue().add(req);
    <span style='font-weight:bold;color:#D3171B'>}</span>

    <span style='font-weight:bold;color:#7B0052;'>public</span> ImageLoader getImageLoader() <span style='font-weight:bold;color:#D3171B'>{</span>
        <span style='font-weight:bold;color:#7B0052;'>return</span> mImageLoader;
    <span style='font-weight:bold;color:#D3171B'>}</span>

    <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> cancelPendingRequests(Object tag) <span style='font-weight:bold;color:#D3171B'>{</span>
        <span style='font-weight:bold;color:#7B0052;'>if</span> (mRequestQueue != <span style='font-weight:bold;color:#7B0052;'>null</span>) <span style='font-weight:bold;color:#D3171B'>{</span>
            mRequestQueue.cancelAll(tag);
        <span style='font-weight:bold;color:#D3171B'>}</span>
    <span style='font-weight:bold;color:#D3171B'>}</span>
<span style='font-weight:bold;color:#D3171B'>}</span></pre>
        `
    },

    {
        id: 4,
        step: "4. buat .java dengan nama MainActivity, isi dengan : ",
        code: `
        <pre style='text-align: left; border: 1px dashed #008DEF; line-height: 18px; padding: 15px; font-size: 13px; font-family:'Courier New', Courier, monospace; overflow: auto;'><span style='font-weight:bold;color:#7B0052;'>import</span> android.app.ProgressDialog;

<span style='font-weight:bold;color:#7B0052;'>import</span> android.content.DialogInterface;
<span style='font-weight:bold;color:#7B0052;'>import</span> android.support.v7.app.AlertDialog;
<span style='font-weight:bold;color:#7B0052;'>import</span> android.support.v7.app.AppCompatActivity;
<span style='font-weight:bold;color:#7B0052;'>import</span> android.os.Bundle;
<span style='font-weight:bold;color:#7B0052;'>import</span> android.util.Log;
<span style='font-weight:bold;color:#7B0052;'>import</span> android.view.LayoutInflater;
<span style='font-weight:bold;color:#7B0052;'>import</span> android.view.View;
<span style='font-weight:bold;color:#7B0052;'>import</span> android.widget.Button;
<span style='font-weight:bold;color:#7B0052;'>import</span> android.widget.ImageView;
<span style='font-weight:bold;color:#7B0052;'>import</span> android.widget.TextView;

<span style='font-weight:bold;color:#7B0052;'>import</span> com.android.volley.Cache;
<span style='font-weight:bold;color:#7B0052;'>import</span> com.android.volley.Request;
<span style='font-weight:bold;color:#7B0052;'>import</span> com.android.volley.Response;
<span style='font-weight:bold;color:#7B0052;'>import</span> com.android.volley.VolleyError;
<span style='font-weight:bold;color:#7B0052;'>import</span> com.android.volley.VolleyLog;
<span style='font-weight:bold;color:#7B0052;'>import</span> com.android.volley.toolbox.ImageLoader;
<span style='font-weight:bold;color:#7B0052;'>import</span> com.android.volley.toolbox.JsonArrayRequest;
<span style='font-weight:bold;color:#7B0052;'>import</span> com.android.volley.toolbox.JsonObjectRequest;
<span style='font-weight:bold;color:#7B0052;'>import</span> com.android.volley.toolbox.StringRequest;
<span style='font-weight:bold;color:#7B0052;'>import</span> org.json.JSONArray;
<span style='font-weight:bold;color:#7B0052;'>import</span> org.json.JSONObject;
<span style='font-weight:bold;color:#7B0052;'>import</span> java.io.UnsupportedEncodingException;

<span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>class</span> MainActivity <span style='font-weight:bold;color:#7B0052;'>extends</span> AppCompatActivity <span style='font-weight:bold;color:#D3171B'>{</span>

<span style='color:#3F7F5F'>//    private static final String IMAGE_REQUEST_URL = "https://androidtutorialpoint.com/api/lg_nexus_5x";
</span><span style='color:#3F7F5F'>//    private static final String STRING_REQUEST_URL = "https://androidtutorialpoint.com/api/volleyString";
</span><span style='color:#3F7F5F'>//    private static final String JSON_OBJECT_REQUEST_URL = "https://androidtutorialpoint.com/api/volleyJsonObject";
</span><span style='color:#3F7F5F'>//    private static final String JSON_ARRAY_REQUEST_URL = "https://androidtutorialpoint.com/api/volleyJsonArray";
</span>
    <span style='font-weight:bold;color:#7B0052;'>private</span> <span style='font-weight:bold;color:#7B0052;'>static</span> <span style='font-weight:bold;color:#7B0052;'>final</span> String IMAGE_REQUEST_URL = <span style='color:#2A00FF'>"https://l200160140.github.io/android/api/image/arya.jpg"</span>;
    <span style='font-weight:bold;color:#7B0052;'>private</span> <span style='font-weight:bold;color:#7B0052;'>static</span> <span style='font-weight:bold;color:#7B0052;'>final</span> String STRING_REQUEST_URL = <span style='color:#2A00FF'>"https://l200160140.github.io/android/api/string"</span>;
    <span style='font-weight:bold;color:#7B0052;'>private</span> <span style='font-weight:bold;color:#7B0052;'>static</span> <span style='font-weight:bold;color:#7B0052;'>final</span> String JSON_OBJECT_REQUEST_URL = <span style='color:#2A00FF'>"https://l200160140.github.io/android/api/jsonObject"</span>;
    <span style='font-weight:bold;color:#7B0052;'>private</span> <span style='font-weight:bold;color:#7B0052;'>static</span> <span style='font-weight:bold;color:#7B0052;'>final</span> String JSON_ARRAY_REQUEST_URL = <span style='color:#2A00FF'>"https://l200160140.github.io/android/api/jsonarray"</span>;
<span style='color:#3F7F5F'>//    private static final String JSON_ARRAY_REQUEST_URL = "https://bana-handaga.github.io/android/api/jsonarray/";
</span>
    ProgressDialog progressDialog;
    <span style='font-weight:bold;color:#7B0052;'>private</span> <span style='font-weight:bold;color:#7B0052;'>static</span> <span style='font-weight:bold;color:#7B0052;'>final</span> String TAG = <span style='color:#2A00FF'>"MainActivity"</span>;
    <span style='font-weight:bold;color:#7B0052;'>private</span> Button stringRequestButton;
    <span style='font-weight:bold;color:#7B0052;'>private</span> Button JsonObjectRequestButton;
    <span style='font-weight:bold;color:#7B0052;'>private</span> Button JsonArrayRequestButton;
    <span style='font-weight:bold;color:#7B0052;'>private</span> Button ImageRequestButton;
    <span style='font-weight:bold;color:#7B0052;'>private</span> View showDialogView;
    <span style='font-weight:bold;color:#7B0052;'>private</span> TextView outputTextView;
    <span style='font-weight:bold;color:#7B0052;'>private</span> ImageView outputImageView;

    @Override
    <span style='font-weight:bold;color:#7B0052;'>protected</span> <span style='font-weight:bold;color:#7B0052;'>void</span> onCreate(Bundle savedInstanceState) <span style='font-weight:bold;color:#D3171B'>{</span>
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        progressDialog = <span style='font-weight:bold;color:#7B0052;'>new</span> ProgressDialog(<span style='font-weight:bold;color:#7B0052;'>this</span>);

        stringRequestButton = (Button)findViewById(R.id.button_get_string);
        JsonObjectRequestButton = (Button)findViewById(R.id.button_get_Json_object);
        JsonArrayRequestButton = (Button)findViewById(R.id.button_get_Json_array);
        ImageRequestButton = (Button)findViewById(R.id.button_get_image);

        stringRequestButton.setOnClickListener(<span style='font-weight:bold;color:#7B0052;'>new</span> View.OnClickListener() <span style='font-weight:bold;color:#D3171B'>{</span>
            @Override
            <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> onClick(View v) <span style='font-weight:bold;color:#D3171B'>{</span>
                volleyStringRequst(STRING_REQUEST_URL);
            <span style='font-weight:bold;color:#D3171B'>}</span>
        <span style='font-weight:bold;color:#D3171B'>}</span>);
        JsonObjectRequestButton.setOnClickListener(<span style='font-weight:bold;color:#7B0052;'>new</span> View.OnClickListener() <span style='font-weight:bold;color:#D3171B'>{</span>
            @Override
            <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> onClick(View v) <span style='font-weight:bold;color:#D3171B'>{</span>
                volleyJsonObjectRequest(JSON_OBJECT_REQUEST_URL);
            <span style='font-weight:bold;color:#D3171B'>}</span>
        <span style='font-weight:bold;color:#D3171B'>}</span>);
        JsonArrayRequestButton.setOnClickListener(<span style='font-weight:bold;color:#7B0052;'>new</span> View.OnClickListener() <span style='font-weight:bold;color:#D3171B'>{</span>
            @Override
            <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> onClick(View v) <span style='font-weight:bold;color:#D3171B'>{</span>
                volleyJsonArrayRequest(JSON_ARRAY_REQUEST_URL);
            <span style='font-weight:bold;color:#D3171B'>}</span>
        <span style='font-weight:bold;color:#D3171B'>}</span>);
        ImageRequestButton.setOnClickListener(<span style='font-weight:bold;color:#7B0052;'>new</span> View.OnClickListener() <span style='font-weight:bold;color:#D3171B'>{</span>
            @Override
            <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> onClick(View v) <span style='font-weight:bold;color:#D3171B'>{</span>
                volleyImageLoader(IMAGE_REQUEST_URL);
            <span style='font-weight:bold;color:#D3171B'>}</span>
        <span style='font-weight:bold;color:#D3171B'>}</span>);

    <span style='font-weight:bold;color:#D3171B'>}</span>


    <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> volleyStringRequst(String url)<span style='font-weight:bold;color:#D3171B'>{</span>

        String  REQUEST_TAG = <span style='color:#2A00FF'>"com.androidtutorialpoint.volleyStringRequest"</span>;
        progressDialog.setMessage(<span style='color:#2A00FF'>"Loading..."</span>);
        progressDialog.show();

        StringRequest strReq = <span style='font-weight:bold;color:#7B0052;'>new</span> StringRequest(url, <span style='font-weight:bold;color:#7B0052;'>new</span> Response.Listener&lt;String&gt;() <span style='font-weight:bold;color:#D3171B'>{</span>
            @Override
            <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> onResponse(String response) <span style='font-weight:bold;color:#D3171B'>{</span>
                Log.d(TAG, response.toString());

                LayoutInflater li = LayoutInflater.from(MainActivity.this);
                showDialogView = li.inflate(R.layout.show_dialog, <span style='font-weight:bold;color:#7B0052;'>null</span>);
                outputTextView = (TextView)showDialogView.findViewById(R.id.text_view_dialog);
                AlertDialog.Builder alertDialogBuilder = <span style='font-weight:bold;color:#7B0052;'>new</span> AlertDialog.Builder(MainActivity.this);
                alertDialogBuilder.setView(showDialogView);
                alertDialogBuilder
                        .setPositiveButton(<span style='color:#2A00FF'>"OK"</span>, <span style='font-weight:bold;color:#7B0052;'>new</span> DialogInterface.OnClickListener() <span style='font-weight:bold;color:#D3171B'>{</span>
                            <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> onClick(DialogInterface dialog, <span style='font-weight:bold;color:#7B0052;'>int</span> id) <span style='font-weight:bold;color:#D3171B'>{</span>
                            <span style='font-weight:bold;color:#D3171B'>}</span>
                        <span style='font-weight:bold;color:#D3171B'>}</span>)
                        .setCancelable(<span style='font-weight:bold;color:#7B0052;'>false</span>)
                        .create();
                outputTextView.setText(response.toString());
                alertDialogBuilder.show();
                progressDialog.hide();
            <span style='font-weight:bold;color:#D3171B'>}</span>
        <span style='font-weight:bold;color:#D3171B'>}</span>, <span style='font-weight:bold;color:#7B0052;'>new</span> Response.ErrorListener() <span style='font-weight:bold;color:#D3171B'>{</span>

            @Override
            <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> onErrorResponse(VolleyError error) <span style='font-weight:bold;color:#D3171B'>{</span>
                VolleyLog.d(TAG, <span style='color:#2A00FF'>"Error: "</span> + error.getMessage());
                progressDialog.hide();
            <span style='font-weight:bold;color:#D3171B'>}</span>
        <span style='font-weight:bold;color:#D3171B'>}</span>);
        <span style='color:#3F7F5F'>// Adding String request to request queue
</span>        AppSingleton.getInstance(getApplicationContext()).addToRequestQueue(strReq, REQUEST_TAG);
    <span style='font-weight:bold;color:#D3171B'>}</span>

    <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> volleyJsonObjectRequest(String url)<span style='font-weight:bold;color:#D3171B'>{</span>

        String  REQUEST_TAG = <span style='color:#2A00FF'>"com.androidtutorialpoint.volleyJsonObjectRequest"</span>;
        progressDialog.setMessage(<span style='color:#2A00FF'>"Loading..."</span>);
        progressDialog.show();

        JsonObjectRequest jsonObjectReq = <span style='font-weight:bold;color:#7B0052;'>new</span> JsonObjectRequest(url, null,
                <span style='font-weight:bold;color:#7B0052;'>new</span> Response.Listener&lt;JSONObject&gt;() <span style='font-weight:bold;color:#D3171B'>{</span>
                    @Override
                    <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> onResponse(JSONObject response) <span style='font-weight:bold;color:#D3171B'>{</span>
                        Log.d(TAG, response.toString());

                        LayoutInflater li = LayoutInflater.from(MainActivity.this);
                        showDialogView = li.inflate(R.layout.show_dialog, <span style='font-weight:bold;color:#7B0052;'>null</span>);
                        outputTextView = (TextView)showDialogView.findViewById(R.id.text_view_dialog);
                        AlertDialog.Builder alertDialogBuilder = <span style='font-weight:bold;color:#7B0052;'>new</span> AlertDialog.Builder(MainActivity.this);
                        alertDialogBuilder.setView(showDialogView);
                        alertDialogBuilder
                                .setPositiveButton(<span style='color:#2A00FF'>"OK"</span>, <span style='font-weight:bold;color:#7B0052;'>new</span> DialogInterface.OnClickListener() <span style='font-weight:bold;color:#D3171B'>{</span>
                                    <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> onClick(DialogInterface dialog, <span style='font-weight:bold;color:#7B0052;'>int</span> id) <span style='font-weight:bold;color:#D3171B'>{</span>
                                    <span style='font-weight:bold;color:#D3171B'>}</span>
                                <span style='font-weight:bold;color:#D3171B'>}</span>)
                                .setCancelable(<span style='font-weight:bold;color:#7B0052;'>false</span>)
                                .create();
                        outputTextView.setText(response.toString());
                        alertDialogBuilder.show();
                        progressDialog.hide();

                    <span style='font-weight:bold;color:#D3171B'>}</span>
                <span style='font-weight:bold;color:#D3171B'>}</span>, <span style='font-weight:bold;color:#7B0052;'>new</span> Response.ErrorListener() <span style='font-weight:bold;color:#D3171B'>{</span>
            @Override
            <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> onErrorResponse(VolleyError error) <span style='font-weight:bold;color:#D3171B'>{</span>
                VolleyLog.d(TAG, <span style='color:#2A00FF'>"Error: "</span> + error.getMessage());
                progressDialog.hide();
            <span style='font-weight:bold;color:#D3171B'>}</span>
        <span style='font-weight:bold;color:#D3171B'>}</span>);

        <span style='color:#3F7F5F'>// Adding JsonObject request to request queue
</span>        AppSingleton.getInstance(getApplicationContext()).addToRequestQueue(jsonObjectReq,REQUEST_TAG);
    <span style='font-weight:bold;color:#D3171B'>}</span>
    <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> volleyJsonArrayRequest(String url)<span style='font-weight:bold;color:#D3171B'>{</span>

        String  REQUEST_TAG = <span style='color:#2A00FF'>"com.androidtutorialpoint.volleyJsonArrayRequest"</span>;
        progressDialog.setMessage(<span style='color:#2A00FF'>"Loading..."</span>);
        progressDialog.show();

        JsonArrayRequest jsonArrayReq = <span style='font-weight:bold;color:#7B0052;'>new</span> JsonArrayRequest(url,
                <span style='font-weight:bold;color:#7B0052;'>new</span> Response.Listener&lt;JSONArray&gt;() <span style='font-weight:bold;color:#D3171B'>{</span>
                    @Override
                    <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> onResponse(JSONArray response) <span style='font-weight:bold;color:#D3171B'>{</span>
                        Log.d(TAG, response.toString());
                        LayoutInflater li = LayoutInflater.from(MainActivity.this);
                        showDialogView = li.inflate(R.layout.show_dialog, <span style='font-weight:bold;color:#7B0052;'>null</span>);
                        outputTextView = (TextView)showDialogView.findViewById(R.id.text_view_dialog);
                        AlertDialog.Builder alertDialogBuilder = <span style='font-weight:bold;color:#7B0052;'>new</span> AlertDialog.Builder(MainActivity.this);
                        alertDialogBuilder.setView(showDialogView);
                        alertDialogBuilder
                                .setPositiveButton(<span style='color:#2A00FF'>"OK"</span>, <span style='font-weight:bold;color:#7B0052;'>new</span> DialogInterface.OnClickListener() <span style='font-weight:bold;color:#D3171B'>{</span>
                                    <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> onClick(DialogInterface dialog, <span style='font-weight:bold;color:#7B0052;'>int</span> id) <span style='font-weight:bold;color:#D3171B'>{</span>
                                    <span style='font-weight:bold;color:#D3171B'>}</span>
                                <span style='font-weight:bold;color:#D3171B'>}</span>)
                                .setCancelable(<span style='font-weight:bold;color:#7B0052;'>false</span>)
                                .create();
                        outputTextView.setText(response.toString());
                        alertDialogBuilder.show();
                        progressDialog.hide();                    <span style='font-weight:bold;color:#D3171B'>}</span>
                <span style='font-weight:bold;color:#D3171B'>}</span>, <span style='font-weight:bold;color:#7B0052;'>new</span> Response.ErrorListener() <span style='font-weight:bold;color:#D3171B'>{</span>
            @Override
            <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> onErrorResponse(VolleyError error) <span style='font-weight:bold;color:#D3171B'>{</span>
                VolleyLog.d(TAG, <span style='color:#2A00FF'>"Error: "</span> + error.getMessage());
                progressDialog.hide();
            <span style='font-weight:bold;color:#D3171B'>}</span>
        <span style='font-weight:bold;color:#D3171B'>}</span>);

        <span style='color:#3F7F5F'>// Adding JsonObject request to request queue
</span>        AppSingleton.getInstance(getApplicationContext()).addToRequestQueue(jsonArrayReq, REQUEST_TAG);
    <span style='font-weight:bold;color:#D3171B'>}</span>

    <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> volleyImageLoader(String url)<span style='font-weight:bold;color:#D3171B'>{</span>
        ImageLoader imageLoader = AppSingleton.getInstance(getApplicationContext()).getImageLoader();

        imageLoader.get(url, <span style='font-weight:bold;color:#7B0052;'>new</span> ImageLoader.ImageListener() <span style='font-weight:bold;color:#D3171B'>{</span>
            @Override
            <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> onErrorResponse(VolleyError error) <span style='font-weight:bold;color:#D3171B'>{</span>
                Log.e(TAG, <span style='color:#2A00FF'>"Image Load Error: "</span> + error.getMessage());
            <span style='font-weight:bold;color:#D3171B'>}</span>

            @Override
            <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> onResponse(ImageLoader.ImageContainer response, <span style='font-weight:bold;color:#7B0052;'>boolean</span> arg1) <span style='font-weight:bold;color:#D3171B'>{</span>
                <span style='font-weight:bold;color:#7B0052;'>if</span> (response.getBitmap() != <span style='font-weight:bold;color:#7B0052;'>null</span>) <span style='font-weight:bold;color:#D3171B'>{</span>

                    LayoutInflater li = LayoutInflater.from(MainActivity.this);
                    showDialogView = li.inflate(R.layout.show_dialog, <span style='font-weight:bold;color:#7B0052;'>null</span>);
                    outputImageView = (ImageView)showDialogView.findViewById(R.id.image_view_dialog);
                    AlertDialog.Builder alertDialogBuilder = <span style='font-weight:bold;color:#7B0052;'>new</span> AlertDialog.Builder(MainActivity.this);
                    alertDialogBuilder.setView(showDialogView);
                    alertDialogBuilder
                            .setPositiveButton(<span style='color:#2A00FF'>"OK"</span>, <span style='font-weight:bold;color:#7B0052;'>new</span> DialogInterface.OnClickListener() <span style='font-weight:bold;color:#D3171B'>{</span>
                                <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> onClick(DialogInterface dialog, <span style='font-weight:bold;color:#7B0052;'>int</span> id) <span style='font-weight:bold;color:#D3171B'>{</span>
                                <span style='font-weight:bold;color:#D3171B'>}</span>
                            <span style='font-weight:bold;color:#D3171B'>}</span>)
                            .setCancelable(<span style='font-weight:bold;color:#7B0052;'>false</span>)
                            .create();
                    outputImageView.setImageBitmap(response.getBitmap());
                    alertDialogBuilder.show();
                <span style='font-weight:bold;color:#D3171B'>}</span>
            <span style='font-weight:bold;color:#D3171B'>}</span>
        <span style='font-weight:bold;color:#D3171B'>}</span>);
    <span style='font-weight:bold;color:#D3171B'>}</span>

    <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> volleyCacheRequest(String url)<span style='font-weight:bold;color:#D3171B'>{</span>
        Cache cache = AppSingleton.getInstance(getApplicationContext()).getRequestQueue().getCache();
        Cache.Entry entry = cache.get(url);
        <span style='font-weight:bold;color:#7B0052;'>if</span>(entry != <span style='font-weight:bold;color:#7B0052;'>null</span>)<span style='font-weight:bold;color:#D3171B'>{</span>
            <span style='font-weight:bold;color:#7B0052;'>try</span> <span style='font-weight:bold;color:#D3171B'>{</span>
                String data = <span style='font-weight:bold;color:#7B0052;'>new</span> String(entry.data, <span style='color:#2A00FF'>"UTF-8"</span>);
                <span style='color:#3F7F5F'>// handle data, like converting it to xml, json, bitmap etc.,
</span>            <span style='font-weight:bold;color:#D3171B'>}</span> <span style='font-weight:bold;color:#7B0052;'>catch</span> (UnsupportedEncodingException e) <span style='font-weight:bold;color:#D3171B'>{</span>
                e.printStackTrace();
            <span style='font-weight:bold;color:#D3171B'>}</span>
        <span style='font-weight:bold;color:#D3171B'>}</span>
        <span style='font-weight:bold;color:#7B0052;'>else</span><span style='font-weight:bold;color:#D3171B'>{</span>

        <span style='font-weight:bold;color:#D3171B'>}</span>
    <span style='font-weight:bold;color:#D3171B'>}</span>

    <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> volleyInvalidateCache(String url)<span style='font-weight:bold;color:#D3171B'>{</span>
        AppSingleton.getInstance(getApplicationContext()).getRequestQueue().getCache().invalidate(url, <span style='font-weight:bold;color:#7B0052;'>true</span>);
    <span style='font-weight:bold;color:#D3171B'>}</span>

    <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> volleyDeleteCache(String url)<span style='font-weight:bold;color:#D3171B'>{</span>
        AppSingleton.getInstance(getApplicationContext()).getRequestQueue().getCache().remove(url);
    <span style='font-weight:bold;color:#D3171B'>}</span>

    <span style='font-weight:bold;color:#7B0052;'>public</span> <span style='font-weight:bold;color:#7B0052;'>void</span> volleyClearCache()<span style='font-weight:bold;color:#D3171B'>{</span>
        AppSingleton.getInstance(getApplicationContext()).getRequestQueue().getCache().clear();
    <span style='font-weight:bold;color:#D3171B'>}</span>

<span style='font-weight:bold;color:#D3171B'>}</span></pre>
        `
    },

    {
        id: 5,
        step: "5. di res->layout, buat file activity_main.xml , isi dengan : ",
        code: `
        <xmp>
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools" android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:paddingLeft="16dp"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingBottom="@dimen/activity_vertical_margin" tools:context=".MainActivity">
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Welcome to Android Volley Tutorial !!\n Choose a menu option."
        android:layout_marginTop="20dp"
        android:textAlignment="center"
        style="@android:style/TextAppearance.DeviceDefault.Widget.ActionBar.Menu"
        android:textSize="15sp"
        android:layout_gravity="center"/>

    <Button
        android:id="@+id/button_get_string"
        android:layout_marginTop="5dp"
        android:layout_marginBottom="5dp"
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:text="Get String "/>
    <Button
        android:id="@+id/button_get_Json_object"
        android:layout_marginTop="5dp"
        android:layout_marginBottom="5dp"
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:text="Get JsonObject "/>
    <Button
        android:id="@+id/button_get_Json_array"
        android:layout_marginTop="5dp"
        android:layout_marginBottom="5dp"
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:text="Get JsonArray "/>
    <Button
        android:id="@+id/button_get_image"
        android:layout_marginTop="5dp"
        android:layout_marginBottom="5dp"
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:text="Get Image "/>

</LinearLayout>
</xmp>
        `
    },

    {
        id: 6,
        step: "6. di res->layout, buat file show_dialog.xml , isi dengan : ",
        code: `
<xmp>
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/layout_root"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical"
    android:padding="5dp" >

    <TextView
        android:id="@+id/text_view_dialog"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:textAlignment="center"
        android:gravity="center"
        style="@android:style/TextAppearance.DeviceDefault.Widget.ActionBar.Menu"
        />

    <ImageView
        android:id="@+id/image_view_dialog"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>

</LinearLayout>
</xmp>
        `
    },
    {
        id: 7,
        step: "7. di res->values, buat file dimens.xml, isi dengan : ",
        code: `
<xmp>
<resources>
    <!-- Default screen margins, per the Android Design guidelines. -->
    <dimen name="activity_horizontal_margin">16dp</dimen>
    <dimen name="activity_vertical_margin">16dp</dimen>
</resources>
</xmp>
        `
    },
]

export default isiData