function init_array(arr, len) {
    for (let i=0; i<len; i++) {
        arr[i] = 0;
    }
}

function init_freecells(arr) {
    for (let row=0; row < 9; row++) {
        for (let col=0; col < 9; col++) {
            let idx=row*9+col;
            arr[idx]=[row,col];
        } 
    }
}

function shuffle(arr) {
    let idx1=0;
    let idx2=0;
    let len=arr.length;
    
    for (let i=0; i<len; i++) {
        idx1 = (Math.random() * 9) | 0;
        idx2 = (Math.random() * 9) | 0;
//        idx1 = lcg.nextIntRange(0,len);
//        idx2 = lcg.nextIntRange(0,len);
        while(idx1 === idx2) {
            idx2 = (Math.random() * 9) | 0;
//            idx2 = lcg.nextIntRange(0,len);
        }
        
        // swap places
        let tmp = arr[idx1];
        arr[idx1]=arr[idx2];
        arr[idx2]=tmp;
    }
}


function generate_right_top(board, numbers) {
    // Initialize right-top
    // First check which rows and columns are available 
    // for the numbers
    shuffle(numbers);
    
    for (let i=0; i<9; i++) {
        let r=[];
        let c=[];
        let found=false;
        
        for (let row=0; row<3; row++) {
            for (let col=0; col<3; col++) {
                let idx=row*9+col;
                if (board[idx]===numbers[i]) {
                    found = true;    
                }
            }
            if (found) {
                found=false;
            } else {
                r.push(row);
            }
        }

        for (let col=0; col<3; col++) {
            for (let row=0; row<3; row++) {
                let idx=3*9*2+6+row*9+col;
                if (board[idx]===numbers[i]) {
                    found = true;    
                }
            }
            if (found) {
                found=false;
            } else {
                c.push(col);
            }
        }

//        console.log('r',r);
//        console.log('c',c);

        let i1=(Math.random() * 2) | 0;
        let i2=(Math.random() * 2) | 0;
        
        let idx=6+r[i1]*9+c[i2];
        
//        if (board[idx]!==0) {
//            idx=6+r[(i1+1)%2]*9+c[i2];
//            if (board[idx]!==0) {
//                idx=6+r[i1]*9+c[(i2+1)%2];
//                if (board[idx]!==0) {
//                    idx=6+r[(i1+1)%2]*9+c[(i2+1)%2];
//                }
//            }
//        }
        board[idx] = numbers[i];
    }
}

function generate_sudoku_board(board) {
    let numbers=[1,2,3,4,5,6,7,8,9];
    
    init_array(board,9*9);
    
    let tmpboard=[];
    
    for (let i=0; i<9;i++) {
        tmpboard[i]=new Array(9);
    }
    
    // Initialize one diagonal from top-left
    // to right-bottom with random numbers 1 to 9
    for (let i=0; i<3; i++) {
        shuffle(numbers);
        for (let row=0; row<3;row++) {
            for (let col=0; col<3;col++) {
                let idx=i*3*9+i*3+row*9+col;
                board[idx]=numbers[row*3+col];
            }
        }
    }
    
    generate_right_top(board, numbers);
    
}

self.onmessage = function(e) {
    let board = [];
    if (e.data === 'generate') {
        generate_sudoku_board(board);
        self.postMessage({board:board});
    } else {
        // Error
        self.postMessage("Something went wrong");
    }
}