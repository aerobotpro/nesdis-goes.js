# nesdis-goes.js
100% browser-based imagery scraping + GIF compilation of recent satellite imagery via star.nesdis.noaa.gov.
Derived from the [Python implementation](https://github.com/aerobotpro/nesdis-goes).
This library accepts the same query as the Python version, aside from timeframe.

```javascript
<html>
<script src="goes.js"></script>
<script>// Sector Query, Band Query, "Dimension"
getImagery("virginia state", "band-1 ir", "250", function(parsedLines)
{
    setImagery(parsedLines, function(GIF_URL){
        console.log(GIF_URL);
    });
});
</script>
</html>
```
