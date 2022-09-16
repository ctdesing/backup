package com.reactnative;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class ReactNativeModule extends NativeReactNativeSpec {
  public static final String NAME = ReactNativeModuleImpl.NAME;

  ReactNativeModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return ReactNativeModuleImpl.NAME;
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @Override
  @ReactMethod
  public void multiply(double a, double b, Promise promise) {
    ReactNativeModuleImpl.multiply(a, b, promise);
  }
}
