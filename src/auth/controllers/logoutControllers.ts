import { Request, Response, NextFunction } from 'express';

const logoutController = async (req: Request, res: Response, next: NextFunction) => {
    // Xóa cookie RefreshToken bằng cách đặt giá trị rỗng và expires về quá khứ
    res.clearCookie('RefreshToken', {
        httpOnly: true,
        secure: false, // Đặt true nếu dùng HTTPS
        sameSite: 'lax',
        path: '/', // Đảm bảo đúng path nếu bạn set cookie với path khác
    });

    // Thông báo cho frontend xóa token trong session
    res.json({
        status: true,
        message: 'Logout successful. Please remove token from session on frontend.'
    });
    next(); // Tiếp tục xử lý middleware khác nếu có
};

export default logoutController;