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
]
def add_text(text, size=18):
    """
    Adds text to the page.

    Parameters:
        - text (str): The text to add to the page.
        - size (int): The size, in pixels (optional).

    Returns:
        - The text element.

    Example usage:
        wizardlib_text = add_text("Wizardlib is cool!")
    """

    element = document.createElement("p")
    element.textContent = text
    element.style.fontSize = size + "px"

    canvas = document.getElementById("canvas")

    if canvas:
        canvas.appendChild(element)
    else:
        document.body.appendChild(element)

    return element


def add_text_input(placeholder):
    """
    Adds a text input to the page.

    Parameters:
        - placeholder (str): The text to display in the input box.

    Returns:
        - The text input element.

    Example usage:
        text_input = add_text_input("Enter your password:")
    """

    element = document.createElement("input")
    element.placeholder = placeholder

    canvas = document.getElementById("canvas")

    if canvas:
        canvas.appendChild(element)
    else:
        document.body.appendChild(element)

    return element


@_is_valid_element("animate_down")
def animate_down(element, distance, time=8, loop=False):
    """
    Animates the element down by the given distance. Can optionally change
    the amount of time the animation takes and whether the element animates
    down and up repeatedly.

    Parameters:
        - element (element): An element to animate.
        - distance (int): The distance the element should travel (in pixels).
        - time (int): The amount of seconds the animation should take (optional).
        - loop (bool): Whether to repeatedly animate down and up.

    Example usage:
        taco_image = add_image("taco.jpg")
        animate_down(taco_image, 100)
    """

    element.style.transition = f"{time}s linear transform"
    start_button = document.getElementById("start")

    if start_button:
        start_button.addEventListener(
            "click",
            _translate_y.bind(None, element, distance),
        )
    else:
        _translate_y(element, distance)

    if loop:
        element.animation_direction = "up"
        element.addEventListener(
            "transitionend", _loop_animation.bind(None, element, distance)
        )

def add_text(text, size=18):
    """
    Adds text to the page.

    Parameters:
        - text (str): The text to add to the page.
        - size (int): The size, in pixels (optional).

    Returns:
        - The text element.

    Example usage:
        wizardlib_text = add_text("Wizardlib is cool!")
    """
    # linebreak = document.createElement("br");
    # text = text.replace("\n", "<br>")

    element = document.createElement("p")
    element.innerText = text

    # Code to make multiline strings work, replace newlines with linebreaks
    element.innerText.replace("\n", "<br>")

    element.style.fontSize = str(size) + "px"

    canvas = document.getElementById("canvas")

    if canvas:
        canvas.appendChild(element)
    else:
        document.body.appendChild(element)

    return element


def add_text_input(placeholder):
    """
    Adds a text input to the page.

    Parameters:
        - placeholder (str): The text to display in the input box.

    Returns:
        - The text input element.

    Example usage:
        text_input = add_text_input("Enter your password:")
    """

    element = document.createElement("input")
    element.placeholder = placeholder

    canvas = document.getElementById("canvas")

    if canvas:
        canvas.appendChild(element)
    else:
        document.body.appendChild(element)

    return element

def animate_down(element, distance, time=8, loop=False):
    """
    Animates the element down by the given distance. Can optionally change
    the amount of time the animation takes and whether the element animates
    down and up repeatedly.

    Parameters:
        - element (element): An element to animate.
        - distance (int): The distance the element should travel (in pixels).
        - time (int): The amount of seconds the animation should take (optional).
        - loop (bool): Whether to repeatedly animate down and up.

    Example usage:
        taco_image = add_image("taco.jpg")
        animate_down(taco_image, 100)
    """

    element.style.transition = f"{time}s linear transform"
    start_button = document.getElementById("start")

    element.distance = distance
    element.time = time
    element.animation_direction = "down"
    element.start_position = int(element.style.top[:-2])

    callback_function = create_once_callable(lambda _: _translate_y(element, distance))

    start_button.addEventListener("click", callback_function)
    if set_interval_called:
        _translate_y(element, distance)

    if loop:
        element.animation_direction = "up"
        callback_function_proxy = create_proxy(
            lambda _: _loop_animation(element, distance)
        )
        element.addEventListener("transitionend", callback_function_proxy)
