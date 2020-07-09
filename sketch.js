// A4
var r = new Rune({
    container: "body",
    width: 1123,
    height: 794,
    debug: true
});

// Circle radii
const outerR = r.width / 3
const concaveR = outerR - r.width / 17
const innerR = r.width / 5
const outerDiffRad = 7;
const portaOffset = 11;

// Random number of gates 
const gates = Math.floor(Rune.random(3, 10)) * 2;

// Random church position
const churchPos = Math.floor(Rune.random(0, gates))

// Random markets position
const marketPos = Math.floor(Rune.random(0, gates))

// Group to hold the city
const city = r.group(r.width / 2, r.height / 2).rotate(90, r.width / 2, r.height / 2);

// Outer and inner circles, coverted to polygons.
//const outerC1 = new Rune.Circle(0, 0, outerR + outerDiffRad).toPolygon({ spacing: 10 }, city).fill("none");
const outerC2 = new Rune.Circle(0, 0, outerR).toPolygon({ spacing: 10 }, city).fill("none") //.stroke("none");
//const outerC3 = new Rune.Circle(0, 0, outerR - outerDiffRad).toPolygon({ spacing: 10 }, city).fill("none");
const concaveC = new Rune.Circle(0, 0, concaveR).toPolygon({ spacing: 10 }, city).fill("none").stroke("none");
const innerC = new Rune.Circle(0, 0, innerR).toPolygon({ spacing: 10 }, city).fill("none");

// Start a path to zigzag around the edges
const perimeter = r.path(0, 0, city).fill("none").moveTo(outerR, 0)

// Spin around the spokes and draw everything
for (let i = 0; i < gates; i++) {

    //Grab positions on circles
    let outer2 = outerC2.vectorAt(i / gates);
    //let outer3 = outerC3.vectorAt(i / gates);
    let concave = concaveC.vectorAt(i / gates);
    let inner = innerC.vectorAt(i / gates);

    // Check if even or odd, then draw the appropriate bits
    if (i % 2 == 0) {

        // Draw a circle and a rect
        r.circle(outer2.x, outer2.y, outerDiffRad, city).fill("none")
        r.rect(innerR - 10, -15, 20, 30, city).fill("none").rotate(360 * i / gates, 0, 0)

        // Draw a line from the centre
        r.line(0, 0, outer2.x, outer2.y, city);

        // Add a node to the perimeter path
        perimeter.lineTo(outer2.x, outer2.y)

    } else {

        if (i >= gates / 2) {
            r.text("Porta", concaveR + portaOffset, 5, city).rotate(360 * i / gates, 0, 0).fontSize("140%").fill("none")
        } else {
        	text = r.group(concaveR + portaOffset, 5, city).rotate(360 * i / gates, 0, 0)
        	r.text("Porta", -46, 10, text).fontSize("140%").fill("none").rotate(180, 0, 0)
        }

        r.rect(innerR - 7.5, -7.5, 15, 15, city).fill("none").rotate(360 * i / gates, 0, 0)

        // Draw a line from the centre
        r.line(0, 0, concave.x, concave.y, city);

        // Add a node to the perimeter path
        perimeter.lineTo(concave.x, concave.y)
    }

    // Draw a church on one of the spokes
    if (i == churchPos) {
        // Group to hold it 
        const church = r.group(innerR - 65, 10, city).rotate(360 * i / gates, 0, 0);

        r.rect(0, 0, 50, 26, church).fill("none") // Outer rect
        r.rect(5, 5, 40, 16, church).fill("none") // Inner rect
        r.circle(13, 13, 5, church).fill("none") // Tower
    }

    // Draw markets on one of the spokes
    if (i == marketPos) {

        // Groups to hold them
        const upperMarket = r.group(innerR + 15, -36, city).rotate(360 * i / gates, 0, 0)
        const lowerMarket = r.group(innerR + 15, 10, city).rotate(360 * i / gates, 0, 0)

        // Upper market
        r.rect(0, 0, 50, 26, upperMarket).fill("none")
        r.line(0, 26, 50, 0, upperMarket)
        r.line(0, 0, 50, 26, upperMarket)
        r.ellipse(25, 13, 30, 15, upperMarket).fill("none")

        // Lower market
        r.rect(0, 0, 50, 26, lowerMarket).fill("none")
        r.line(0, 13, 50, 13, lowerMarket)
        r.ellipse(25, 14, 30, 15, lowerMarket).fill("none")

    }
};

// Finish off the perimeter wall
perimeter.closePath()

// Draw it 
r.draw();

// Downloader function
function downloadMe() { download(document.querySelector("svg").outerHTML, "sketch.svg", "image/svg+xml") }