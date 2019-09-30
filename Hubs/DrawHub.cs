using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;


class DrawHub : Hub 
{
        public async Task SendCoordinates(double x, double y)
        {
            await Clients.All.SendAsync("ReceiveCoordinates", x, y);
        }

        public async Task SendPathStop()
        {
            await Clients.All.SendAsync("ReceivePathStop");
        }
}