function Dimension(context, width, height) {
    this.context = context;
    this.width = width | 0;
    this.height = height | 0;
    
    Dimension.prototype.print = function() {
        console.log('Dimension.width ', this.width);
        console.log('Dimension.height ', this.height);
    }
}