# AppleStockNotifier
AppleStockNotifier is a small Node.js based server that notifies via email when the preferred iPhone is available in stock in a specific store location.

Get all Apple Store code [here](http://www.istocknow.com/live/live.php?type=7Plus&ajax=1)

# Usage

```Javascript
  npm install
  node index.js <email_from> <email_from_pass> <email_to> <store_code> <iPhone_model> <color> <capacity>
```

## Example

```Javascript
node index.js timcook@apple.com verysecurepassword foo@bar.com 14708 7Plus Black 128GB
```
### Note
'email_from' is configured for GMail
