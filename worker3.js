function init_array(arr, len) {
    for (let i=0; i<len; i++) {
        arr[i] = 0;
    }
}

function shuffle(arr) {
    let idx1=0;
    let idx2=0;
    let len=arr.length;
    
    for (let i=0; i<len; i++) {
        idx1 = (Math.random() * 9) | 0;
        idx2 = (Math.random() * 9) | 0;
        while(idx1 === idx2) {
            idx2 = (Math.random() * 9) | 0;
        }
        
        // swap places
        let tmp = arr[idx1];
        arr[idx1]=arr[idx2];
        arr[idx2]=tmp;
    }
}

function docheck(check) {
    for (let i=0; i<9; i++) {
        if (check[i] !== 1) {
            return false;
        }
    }
    return true;
}

function isvalid_board(board) {
    let check=[];

    let valid=true;
    
    // check boxes for 1 to 9
    for(let box=0; box<9;box++) {
        let idx=(box%3)*3 + ((box/3)|0)*27;
        init_array(check,9);
        for (let i=0; i<9; i++) {
            let idx2=(i%3) + ((i/3)|0)*9;
            let index = idx + idx2; 
            check[board[index]-1]++;
        }
        valid=docheck(check);
    }

    if(!valid) return valid;
    
    // check all rows
    for (let row=0; row<9; row++) {
        init_array(check,9);
        for (let col=0; col<9; col++) {
            let index=col+row*9;    
            check[board[index]-1]++;
        }    
        valid=docheck(check);
    }

    if(!valid) return valid;
    
    // check all columns
    for (let col=0; col<9; col++) {
        init_array(check,9);
        for (let row=0; row<9; row++) {
            let index=col+row*9;    
            check[board[index]-1]++;
        }    
        valid=docheck(check);
    }
    
    return valid;
}


function generate_sudoku_board(board) {
    let registered=[];
    let numbers=[1,2,3,4,5,6,7,8,9];

    
    init_array(registered, 81);
    
    // fill the 3x3 subboards with random numbers 1 to 9
    for (let i=0; i<81;i++) {
        idx=(i%3) + 
            (((i/3)|0)%3)*9 + 
            (((i/9)|0)%3)*3 +
            ((i/27)|0)*27;
        
        if ((i%9)===0) shuffle(numbers);
        board[idx]=numbers[i%9];
    }
    
    // try to make a valid board
    for (let row=0; row<1; row++) {
        
        let arr=[];
        for (let col=0; col<9; col++) {
            
            let index=row*9+col;
            let num=board[index];
            
            // Double entry found
            if (arr.indexOf(num)!==-1) {
                console.log('num',num);
            }
            arr[col]=num;
            //arr.indexOf(..);
        }
        
    }
    
//    console.log('isvalid_board',isvalid_board(board));
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