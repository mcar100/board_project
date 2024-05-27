package com.example.demo.util;

import java.util.HashMap;

public class DataFormatHelper {
	
	private DataFormatHelper() {}

	public static void convertHashMapToObject(HashMap<String,Object> hashmap) {
		for( HashMap.Entry<String, Object> entry : hashmap.entrySet() ){
			String strKey = entry.getKey();
			Object value = entry.getValue();
		    System.out.println( strKey );
		    System.out.println( value );
		}
	}
	
}
