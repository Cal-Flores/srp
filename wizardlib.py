# flake8: noqa

_valid_colors = [
    "white",
    "silver",
    "gray",
    "black",
    "red",
    "maroon",
    "yellow",
    "olive",
    "lime",
    "green",
    "aqua",
    "teal",
    "blue",
    "navy",
    "fuchsia",
    "purple",
    "orange",
    "mediumvioletred",
    "deeppink",
    "palevioletred",
    "hotpink",
    "lightpink",
    "pink",
    "darkred",
    "firebrick",
    "crimson",
    "indianred",
    "lightcoral",
    "salmon",
    "darksalmon",
    "lightsalmon",
    "orangered",
    "tomato",
    "darkorange",
    "coral",
    "darkkhaki",
    "gold",
    "khaki",
    "peachpuff",
    "palegoldenrod",
    "moccasin",
    "papayawhip",
    "lightgoldenrodyellow",
    "lemonchiffon",
    "lightyellow",
    "brown",
    "saddlebrown",
    "sienna",
    "chocolate",
    "darkgoldenrod",
    "peru",
    "rosybrown",
    "goldenrod",
    "sandybrown",
    "tan",
    "burlywood",
    "wheat",
    "navajowhite",
    "bisque",
    "blanchedalmond",
    "cornsilk",
    "darkgreen",
    "darkolivegreen",
    "forestgreen",
    "seagreen",
    "olivedrab",
    "mediumseagreen",
    "limegreen",
    "springgreen",
    "mediumspringgreen",
    "darkseagreen",
    "mediumaquamarine",
    "yellowgreen",
    "lawngreen",
    "chartreuse",
    "lightgreen",
    "greenyellow",
    "palegreen",
    "darkcyan",
    "lightseagreen",
    "cadetblue",
    "darkturquoise",
    "mediumturquoise",
    "turquoise",
    "cyan",
    "aquamarine",
    "paleturquoise",
    "lightcyan",
    "darkblue",
    "mediumblue",
    "midnightblue",
    "royalblue",
    "steelblue",
    "dodgerblue",
    "deepskyblue",
    "cornflowerblue",
    "skyblue",
    "lightskyblue",
    "lightsteelblue",
    "lightblue",
    "powderblue",
    "indigo",
    "darkmagenta",
    "darkviolet",
    "darkslateblue",
    "blueviolet",
    "darkorchid",
    "magenta",
    "slateblue",
    "mediumslateblue",
    "mediumorchid",
    "mediumpurple",
    "orchid",
    "violet",
    "plum",
    "thistle",
    "lavender",
    "mistyrose",
    "antiquewhite",
    "linen",
    "beige",
    "whitesmoke",
    "lavenderblush",
    "oldlace",
    "aliceblue",
    "seashell",
    "ghostwhite",
    "honeydew",
    "floralwhite",
    "azure",
    "mintcream",
    "snow",
    "ivory",
    "darkslategray",
    "dimgray",
    "slategray",
    "lightslategray",
    "darkgray",
    "lightgray",
    "gainsboro",
]

def _is_valid_element(func_name):
    """
    Allows us to throw a helpful error message if someone passes a raw value
    to a function that accepts a DOM element. For some reason, Transcrypt
    wants this definition before it's used, so it has to be at the top of the
    file.
    """

    def decorator(func):
        def wrapper(*args, **kwargs):
            element = args[0]
            if isinstance(element, (float, int, str)):
                raise Exception(
                    f"Error in {func_name}(), invalid element passed as first "
                    " argument\n"
                    f"  - '{element}' is not a valid element!\n"
                    f"  - Did you pass an element created with add_image(), "
                    "add_text(), or add_button() as the first argument?\n"
                )
            # This will catch functions passed in where an element is exepected
            # or `undefined` JS vars that sneak through.
            elif callable(element) or not element:
                raise Exception(
                    f"Error in {func_name}(), invalid element passed as first"
                    " argument\n"
                    f"  - Did you pass an element created with add_image(), "
                    "add_text(), or add_button() as the first argument?\n"
                )

            return func(*args, **kwargs)

        return wrapper

    return decorator


def add_audio(filename):
    """
    Adds an audio file.

    Parameters:
        - filename (str): The filename.

    Returns:
        - The audio element.

    Example usage:
        audio_element = add_audio("never-gonna-give-you-up.mp3")
    """

    element = document.createElement("audio")
    element.addEventListener(
        "error", _filename_not_found.bind(None, filename, "add_audio")
    )
    element.src = filename

    document.body.appendChild(element)

    return element



def add_background(filename):
    """
    Adds a background image.

    Parameters:
        - filename (str): The filename.

    Example usage:
        add_background("flying-cats.png")
    """

    element = document.createElement("img")
    element.addEventListener(
        "error", _filename_not_found.bind(None, filename, "add_background")
    )
    element.src = filename

    canvas = document.getElementById("canvas")

    if canvas:
        canvas.style.backgroundImage = f"url({filename})"
    else:
        document.querySelector("html").style.backgroundImage = f"url({filename})"


def add_background_audio(filename):
    """
    Adds background audio which plays when you click the "Start" button.

    Parameters:
        - filename (str): The filename.

    Example usage:
        add_background_audio("never-gonna-give-you-up.mp3")
    """

    element = document.createElement("audio")
    element.addEventListener(
        "error", _filename_not_found.bind(None, filename, "add_background_audio")
    )

    element.src = filename
    element.id = "bg-music"
    element.loop = True

    document.body.appendChild(element)

def add_button(text):
    """
    Adds a button.

    Parameters:
        - text (str): The text on the button.

    Returns:
        - The button element.

    Example usage:
        button = add_button("Click Me")
    """

    element = document.createElement("button")
    element.textContent = text
    element.style.alignSelf = "flex-start"

    canvas = document.getElementById("canvas")

    if canvas:
        canvas.appendChild(element)
    else:
        document.body.appendChild(element)

    return element


def add_image(filename, size=None):
    """
    Adds an image to the page.

    Parameters:
        - filename (str): The filename.
        - size (int): The size, in pixels (optional).

    Returns:
        - The image element.

    Example usage:
        taco_image = add_image("taco.png")
    """

    element = document.createElement("img")
    element.addEventListener(
        "error", _filename_not_found.bind(None, filename, "add_image")
    )
    element.src = filename

    if size:
        element.style.width = size + "px"

    canvas = document.getElementById("canvas")

    if canvas:
        canvas.appendChild(element)
    else:
        document.body.appendChild(element)

    return element
