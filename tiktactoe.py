import random

def draw_board():
    for row in range(0,3):
        for row_item in range(0,3):
            symbol = board[row][row_item]
            if symbol != 0:
                mark = symbols[symbol]
                symbol_text = add_text(mark, 40)
                position_element(symbol_text, 260 + row_item * 130, 250 + row * 130)
