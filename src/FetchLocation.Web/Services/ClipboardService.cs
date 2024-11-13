using Microsoft.JSInterop;

namespace FetchLocation.Web.Services;

public sealed class ClipboardService(IJSRuntime jsRuntime)
{
    public async ValueTask CopyToClipboard(string text)
    {
        await jsRuntime.InvokeVoidAsync("navigator.clipboard.writeText", text);
    }
    public async ValueTask<string> GetFromClipboard()
    {
        return await jsRuntime.InvokeAsync<string>("navigator.clipboard.readText");
    }
}
