

function ShortUrl(full,short,clicks) {
    this.full = full;
    this.short = short || null;
    this.clicks = clicks || 0;
}


module.exports = ShortUrl;


