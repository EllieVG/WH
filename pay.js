class OTP{
  static String BASE_URL = "https://pruebas.sypago.net:8086";
  static String TOKEN_PATH = "/api/v1/auth/token";
  static String OTP_PATH = "/api/v1/request/otp";
  static String CTA = "01910054542154028418";
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

      string body = "{"client_id":"heros","secret":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJmZXpQcl9HSWhIZ05jOVc1cU5Td2FIQXBRMVRqeUlqbWtpY0d5V1hHUjFzIn0.eyJleHAiOjE4MTQ4OTM0OTEsImlhdCI6MTcyODQ5MzQ5MSwianRpIjoiMDI4ZTE0NjYtYWQ5Ni00MTVkLThhMTktMjk2ODYwN2I0YTcxIiwiaXNzIjoiaHR0cHM6Ly9wcnVlYmFzLnN5cGFnby5uZXQ6ODA4MS9yZWFsbXMvc3lwYWdvIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjVlZmVjMmE2LTc2YjAtNGU3OC1iN2Q3LTYzNzAwYWIyNDA3ZCIsInR5cCI6IkJlYXJlciIsImF6cCI6InN5cGFnb19hcGlrZXlfYWRtaW4iLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXN5cGFnbyIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9mZmxpbmVfYWNjZXNzIHN5YXBwX3Njb3BlIHByb2ZpbGUgZW1haWwgc3lwYWdvX2FwaV9rZXlfc2NvcGU6YzRlYjczNzctMWUyNy00Y2M2LTllNTMtN2Y2M2UwY2Q5YjBhLlVzZXIiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImNsaWVudEhvc3QiOiIxOTIuMTY4LjQ4LjEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtc3lwYWdvX2FwaWtleV9hZG1pbiIsImNsaWVudEFkZHJlc3MiOiIxOTIuMTY4LjQ4LjEiLCJjbGllbnRfaWQiOiJzeXBhZ29fYXBpa2V5X2FkbWluIn0.R8CZi8Y2p8x9iuX1oqueByTIWhtxV6j4K3IlcE3RrLzvk6nYL7KILGRKcBwLxuraRyK1aoWx2Zvle_Trcj4M1N1YNbeLJGEURmAu3kxpvqV6_9AOR6Fxe7rtB67vAywwqeKT0WrezwoxZpYcQSqu2S9TngCB-PGvFHh90Io8edUN4cgf-3x9pp0pZ457nUTCWMbp6kAB3AmPIP2WP45Tef7NPmMRbntNRsU174jKe-CDQeOFmOusVa46NnWhHJd28k7yMu6D_FPN-JoIYqmrKZDt605fxbdOqKTm215rBKGCrUtgD4d5xGMXevzKHBwngmlIFe3OV7xKp8---nP_yg"}";

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
