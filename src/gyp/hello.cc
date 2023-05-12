#include <node_api.h>

napi_value say_hello(napi_env env, napi_callback_info info) {
    size_t argc = 1;
    napi_value args[1];
    napi_value output;

    napi_get_cb_info(env, info, &argc, args, NULL, NULL);
    napi_create_string_utf8(env, "Hello World", 11, &output);
    return output;
}

napi_value init(napi_env env, napi_value exports) {
    napi_value hello;
    napi_create_function(env, nullptr, 0, say_hello, nullptr, &hello);
    return hello;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, init)
