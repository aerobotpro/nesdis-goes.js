# nesdis-goes.js
100% browser-based imagery scraping + GIF compilation.
Uses a similar method as my Python version aside from time window.

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
