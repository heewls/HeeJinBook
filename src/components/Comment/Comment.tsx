import { CommentType } from '../ReviewModal/ReviewModal';
import * as S from './Comment.styles';
import { CreateComment } from './CreateComment/CreateComment';
import IconX from '../../assets/svg/X.svg';
import IconNoImage from '../../assets/svg/noImageUser.svg';
import { Contents, deleteComment, putComment } from '../../apis/review';
import { Input } from '../common/Input/Input';
import { useState } from 'react';
import { Toast } from '../common/Toastify/Toastify';

type CommentProps = {
  comments: CommentType[];
  detailReview: (reviewId: number) => void;
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
};

export function Comment({ comments, detailReview, setComments }: CommentProps) {
  const [invisible, setInvisible] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [myContents, setMyContents] = useState<Contents>({
    contents: '',
  });

  const deleteMyComment = (commentId: number) => {
    deleteComment(commentId).then(() => {
      setComments((prev) => prev.filter((comment) => comment.commentId !== commentId));
    });
  };

  const editBtnInVisible = (commentId: number, contents: string) => {
    setMyContents({
      contents: contents,
    });
    setEditId(commentId);
    setInvisible(true);
  };

  const editMyContent = (commentId: number, reviewId: number) => {
    putComment(commentId, myContents).then((result) => {
      console.log(myContents);
      if (result.status === 200) {
        Toast.success('댓글이 수정되었습니다');
        setInvisible(false);
        setEditId(null);
        detailReview(reviewId);
      }
    });
  };

  const commentChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMyContents({ contents: e.target.value });
  };

  return (
    <S.Comment>
      <CreateComment detailReview={detailReview} reviewId={comments[0].reviewId} />
      {comments.length > 0 ? (
        comments.map((comment) => (
          <S.CommentsContainer>
            <S.Comments key={comment.commentId}>
              <S.ProfileContainer>
                {comment.commentAuthorProfileUrl === null ? (
                  <S.CommentProfile src={IconNoImage} />
                ) : (
                  <S.CommentProfile src={comment.commentAuthorProfileUrl} />
                )}
              </S.ProfileContainer>
              <div style={{ width: '100%' }}>
                <S.CommentUser>{comment.commentAuthor}</S.CommentUser>
                <S.CommentCreatedAt>{comment.commentCreatedAt}</S.CommentCreatedAt>
                <S.CommentContent>{comment.contents}</S.CommentContent>
                {comment.isMine && editId === comment.commentId && (
                  <Input
                    topSlot="comment"
                    type="text"
                    style={{ height: '20px' }}
                    rightSlot={
                      <S.EditBtn onClick={() => editMyContent(comment.commentId, comment.reviewId)}>
                        수정
                      </S.EditBtn>
                    }
                    value={myContents.contents}
                    onChange={commentChangeHandler}
                  />
                )}
              </div>
            </S.Comments>
            {comment.isMine && (
              <S.IconXContainer>
                <img src={IconX} onClick={() => deleteMyComment(comment.commentId)} />
                {!invisible && (
                  <button onClick={() => editBtnInVisible(comment.commentId, comment.contents)}>
                    수정
                  </button>
                )}
              </S.IconXContainer>
            )}
          </S.CommentsContainer>
        ))
      ) : (
        <S.NoComment>
          <p>아직 댓글이 없습니다</p>
          <p>댓글을 남겨보세요</p>
        </S.NoComment>
      )}
    </S.Comment>
  );
}
