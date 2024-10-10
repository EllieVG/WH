class OTP{
    static String BASE_URL = "https://pruebas.sypago.net:8086";
    static String TOKEN_PATH = "/api/v1/auth/token";
    static String OTP_PATH = "/api/v1/request/otp";
    static String CTA = "12345678901234567890";
    static SocketsHttpHandler shHandler;

    static async Task Main(string[] args)

    {
        shHandler = new SocketsHttpHandler
        {
            MaxConnectionsPerServer = 100,
            PooledConnectionLifetime = TimeSpan.FromMinutes(10),
            ConnectTimeout = TimeSpan.FromSeconds(200),
            PooledConnectionIdleTimeout = TimeSpan.FromSeconds(5),
            ResponseDrainTimeout = TimeSpan.FromSeconds(5),
        };

        HttpClient? cliente;

        cliente = new HttpClient(shHandler);
        cliente.BaseAddress = new Uri(BASE_URL);

        string body = "{"client_id":"user_name","secret":"api_key"}";

        var contenido = new StringContent(body, Encoding.UTF8, "application/json");
        var respuesta = await cliente.PostAsync(TOKEN_PATH, contenido);
        var resultado = await respuesta.Content.ReadAsStringAsync();

        JsonDocument jsonDoc = JsonDocument.Parse(resultado);
        string accessToken = jsonDoc.RootElement.GetProperty("access_token").GetString();

        //Console.WriteLine(accessToken);
        var internal_id = new Random().Next(1, 999999).ToString("000000") + new Random().Next(1, 999999).ToString("000000");
        var group_id = new Random().Next(1, 999999).ToString("000000") + new Random().Next(1, 999999).ToString("000000");

        body = "{"creditor_account": {"bank_code": "0108","type": "CNTA","number": "" + CTA + ""},"debitor_document_info": {"type": "V","number": "21290681"},"debitor_account": {"bank_code": "0102","type": "CELE","number": "" + "04140121871" + ""},"amount": {"amt": 5,"currency": "VES"}}";

        cliente.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken);

        contenido = new StringContent(body, Encoding.UTF8, "application/json");
        respuesta = await cliente.PostAsync(OTP_PATH, contenido);
        resultado = await respuesta.Content.ReadAsStringAsync();
        //jsonDoc = JsonDocument.Parse(resultado);

        //string transaction_id = jsonDoc.RootElement.GetProperty("transaction_id").GetString();  
        Console.WriteLine(resultado);
    }
}
