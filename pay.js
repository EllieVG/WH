public class OTP {
    
    static String BASE_URL = "https://pruebas.sypago.net:8086";
    static String OTP_PATH = "/api/v1/request/otp";
    static String cuenta = "01910054542154028418";
    static String cel = "041210133088;
    static String token = "access_token";

    
    public static final MediaType JSON = MediaType.get("application/json");
    OkHttpClient client = new OkHttpClient();
    
    public static void main(String[] args) throws IOException  {
    
        SypagoDocum sypago = new SypagoDocum();
        String OTP ="""
                    {
                        "creditor_account": {
                            "bank_code": "1234",
                            "type": "CNTA",
                            "number": "12345678901234567890"
                        },
                        "debitor_document_info": {
                            "type": "V",
                            "number": "4121234567"
                        },
                        "debitor_account": {
                            "bank_code": "1234",
                            "type": "CELE",
                            "number": "4121234567"
                        },
                        "amount": {
                        "amt": 1,
                        "currency": "VES" 
                        }
                    }
                    """.formatted(cuenta, cel);
       
        var resp = sypago.getOTP(BASE_URL+OTP_PATH, OTP, token); 
        System.out.println(resp);
    }
    
       
    public String getOTP(String url, String json, String token) throws IOException {
        
        RequestBody body = RequestBody.create(json, JSON);
        Request request = new Request.Builder()
        .url(url)
        .addHeader("Authorization", "Bearer " + token)
        .post(body)
        .build();
        
        try (Response response = client.newCall(request).execute()) {
            
          response.code();
                
          return response.body().string();
        }
    }
}
