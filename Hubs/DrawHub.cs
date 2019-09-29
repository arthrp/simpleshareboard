using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;


class DrawHub : Hub 
{
        public async Task SendCoordinates(int x, int y)
        {
            await Clients.All.SendAsync("ReceiveCoordinates", x, y);
        }

        public async Task SendPathStop()
        {
            await Clients.All.SendAsync("ReceivePathStop");
        }
}