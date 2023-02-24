"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchNFTs = void 0;

// Go to www.alchemy.com and create an account to grab your own api key!
// const apiKey = "Q5llQ1d3wTHYXi4lRoGYUQYdW2-SJDJo";
// const endpointMendpoint = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;
var fetchNFTs = function fetchNFTs(owner, contractAddress, network, setNFTs, retryAttempt) {
  var data;
  return regeneratorRuntime.async(function fetchNFTs$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(retryAttempt === 5)) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return");

        case 2:
          if (!owner) {
            _context.next = 20;
            break;
          }

          _context.prev = 3;

          if (!contractAddress) {
            _context.next = 10;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(fetch("".concat(network, "/getNFTs?owner=").concat(owner, "&contractAddresses%5B%5D=").concat(contractAddress)).then(function (data) {
            return data.json();
          }));

        case 7:
          data = _context.sent;
          _context.next = 13;
          break;

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(fetch("".concat(network, "/getNFTs?owner=").concat(owner)).then(function (data) {
            return data.json();
          }));

        case 12:
          data = _context.sent;

        case 13:
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](3);
          fetchNFTs(network, owner, contractAddress, setNFTs, retryAttempt + 1);

        case 18:
          setNFTs(data.ownedNfts);
          return _context.abrupt("return", data);

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 15]]);
};

exports.fetchNFTs = fetchNFTs;