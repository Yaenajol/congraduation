// 지인이 써주는 텍스트 컴포넌트 - 메모리를 써주면서 남기는 글

function MemoryMessage() {
    return (
        <div>
            <div>
                <input type="text" placeholder="벌명"/>
                <br />
                <input type="text" placeholder="친구에게 전해줄 문구를 넣어주세요"/>
            </div>
        </div>
    )
}

export default MemoryMessage