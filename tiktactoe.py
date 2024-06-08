import random

def draw_board():
    for row in range(0,3):
        for row_item in range(0,3):
            symbol = board[row][row_item]
            if symbol != 0:
                mark = symbols[symbol]
                symbol_text = add_text(mark, 40)
                position_element(symbol_text, 260 + row_item * 130, 250 + row * 130)

def board_full():
    is_full = True
    for row in board:
       if 0 in row:
          is_full = False
    return is_full

def computer_move():
    move_made = False
    while not move_made:
        row = random.randint(0, 2)
        row_item = random.randint(0,2)
        if board[row][row_item] == 0:
            board[row][row_item] = 2
            move_made = True
