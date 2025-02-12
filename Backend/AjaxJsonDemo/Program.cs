var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
builder.Services.AddControllers();
var app = builder.Build();

app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseRouting();
app.UseEndpoints(endpoints => { _ = endpoints.MapControllers(); });

app.Run();