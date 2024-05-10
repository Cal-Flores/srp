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
