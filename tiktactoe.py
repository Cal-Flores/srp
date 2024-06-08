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

def check_for_winner():
    #first row
    a1 = board[0][0]
    b1 = board[0][1]
    c1 = board[0][2]
    #second row
    a2 = board[1][0]
    b2 = board[1][1]
    c2 = board[1][2]
    #third row
    a3 = board[2][0]
    b3 = board[2][1]
    c3 = board[2][2]
